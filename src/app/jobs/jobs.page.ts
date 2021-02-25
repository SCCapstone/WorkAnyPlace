import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from '../jobs.service';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {

  db = firebase.firestore();
  user = firebase.auth().currentUser;

  constructor(private router: Router,public jobsService: JobsService) { }

  ngOnInit() {
    this.jobsService.getPostedJobs();
  }

  openCreateJob() {
    this.router.navigate(['/create-job']);
  }

  refresh() {
    this.jobsService.getPostedJobs();
  }

  async removeJob(post){
    if (post.uid == this.user.uid) {   
      // this.db.collection('users').doc(this.user.uid).update({
      //   postedJobs: firebase.firestore.FieldValue.arrayRemove(post)
      // });
    
      await this.db.collection('postedJobs').doc('jobs').update({
       postedJobs: firebase.firestore.FieldValue.arrayRemove(post)
      });

      this.refresh()
   } else {
      alert("This is not your post");
   }

  }

  async addToMyJobs(post){
    this.jobsService.addAcceptedJob(post);
    await this.db.collection('postedJobs').doc('jobs').update({
      postedJobs: firebase.firestore.FieldValue.arrayRemove(post)
     });
     this.jobsService.getMyJobs();
     this.refresh();
  }

  logout() {
    this.router.navigate(['/login']);
  }

// removeJobFromPostedJobs() {
  //   this.db.collection('postedJobs').doc('jobs').set({
  //     postedJobs: firebase.firestore.FieldValue.arrayRemove(post)
  //    });
  // }

} 

