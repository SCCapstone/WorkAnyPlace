import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from '../jobs.service';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {

  db = firebase.firestore();
  user = firebase.auth().currentUser;
  

  constructor(private router: Router,public jobsService: JobsService, private fireAuth: AngularFireAuth) { }

  async ngOnInit() {

    this.jobsService.getPostedJobs();
    await this.jobsService.getProfilePic();
    var img = document.getElementById('profilepic');
    img.setAttribute('src', this.jobsService.profilepic);
    this.jobsService.getUser();
    
  }

  openCreateJob() {
    this.router.navigate(['/create-job']);  // navigates to create job page when icon is clicked
  }

  async goToJobDetail(post) {  // pulls up individual post based on post uid
    await this.jobsService.getSelectedUser(post.uid);
    this.jobsService.setSelectedJob(post);
    this.router.navigate(['../job-detail']);
  }

  goToSettings() {
    this.router.navigate(['../settings'])  // navigates to settings page when icon is clicked
  }

  logout() {  // logs out, reloading window so previous login information is not retained
    this.fireAuth.signOut().then(() => {
      console.log("signed out")
    })
    firebase.auth().signOut();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  refresh() {  // reloads page so either new jobs can appear or jobs that were accepted can disappear
    this.jobsService.getPostedJobs();
    this.jobsService.getProfilePic();
    var img = document.getElementById('profilepic');
    img.setAttribute('src', this.jobsService.profilepic);
  }

  async filterList(evt) {
    let jobList = this.jobsService.posts;
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      this.jobsService.postsNew = jobList;
      return;
    }

    jobList = jobList.filter(currentJob => {
      if (currentJob.title && searchTerm) {  // search by title, category, or location
        return (currentJob.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || currentJob.category.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || currentJob.location.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    })

    this.jobsService.postsNew = jobList;
  }

  async removeJob(post){  // deletes job post from Firebase
    if (post.uid == this.user.uid) {   // can only delete you own post
      // this.db.collection('users').doc(this.user.uid).update({
      //   postedJobs: firebase.firestore.FieldValue.arrayRemove(post)
      // });
    
      await this.db.collection('postedJobs').doc('jobs').update({
       postedJobs: firebase.firestore.FieldValue.arrayRemove(post)
      });

      this.refresh()
   } else {
      alert("This is not your post");  // error message if you try to delete someone elses post
   }

  }

  async addToMyJobs(post){  // removes job post from Find Jobs page and adds to your My Jobs page
    this.jobsService.addAcceptedJob(post);
    await this.db.collection('postedJobs').doc('jobs').update({
      postedJobs: firebase.firestore.FieldValue.arrayRemove(post)
     });
     this.jobsService.getMyJobs();
     this.refresh();
  }

// removeJobFromPostedJobs() {
  //   this.db.collection('postedJobs').doc('jobs').set({
  //     postedJobs: firebase.firestore.FieldValue.arrayRemove(post)
  //    });
  // }

} 
