import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from '../jobs.service';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {

  db = firebase.firestore();
  user = firebase.auth().currentUser;

  constructor(private router: Router,public jobsService: JobsService) { }

  posts;
  

  ngOnInit() {

    this.getPostedJobs();   
  }

  openCreateJob() {
    this.router.navigate(['/create-job']);
  }

  refresh() {
    this.getPostedJobs();   
  }

  removeJob(post){
    if (post.uid == this.user.uid) {
      this.db.collection('users').doc(this.user.uid).update({
        postedJobs: firebase.firestore.FieldValue.arrayRemove(post)
      });
      
    
      this.db.collection('postedJobs').doc('jobs').update({
       postedJobs: firebase.firestore.FieldValue.arrayRemove(post)
      });


    //this.jobsService.removeJob(title,pay,category,description);
      this.getPostedJobs();
   } else {
      alert("This is not your post");
   }

  }

  // removeJobFromPostedJobs() {
  //   this.db.collection('postedJobs').doc('jobs').set({
  //     postedJobs: firebase.firestore.FieldValue.arrayRemove(post)
  //    });
  // }
  addToMyJobs(post){
    this.jobsService.addAcceptedJob(post);
    this.db.collection('postedJobs').doc('jobs').update({
      postedJobs: firebase.firestore.FieldValue.arrayRemove(post)
     });
     this.refresh();

  }

  async getPostedJobs() {
    var jobs = await this.db.collection('postedJobs').doc('jobs').get().then(function(doc) {
       if (doc.exists) {
          console.log("Document data:", doc.data());
          return doc.data().postedJobs;
         } else {
           // doc.data() will be undefined in this case
          console.log("No such document!");
       }
     }).catch(function(error) {
       console.log("Error getting document:", error);
     }); 
     this.posts = jobs;
  }
} 

