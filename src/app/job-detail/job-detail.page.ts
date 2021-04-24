import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { MessageService } from '../message.service';
import { AlertController } from '@ionic/angular';

import { platformBrowserTesting } from '@angular/platform-browser/testing';
@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.page.html',
  styleUrls: ['./job-detail.page.scss'],
})
export class JobDetailPage implements OnInit {

  constructor(public jobsService:JobsService,
    public alertController: AlertController,
    public messageService:MessageService, 
    public router: Router) { }

  
  defaultimg = '../assets/img/work_any_place_logo.png' 

  db = firebase.firestore();
  user = firebase.auth().currentUser;

 

  async ngOnInit() {
    await this.getSelectedUser();

    

  }

  async addToMyJobs(post){

    if(this.user.uid == post.uid) {
      alert("This is your post!");
      return;
    }
    this.jobsService.addAcceptedJob(post);
    await this.db.collection('postedJobs').doc('jobs').update({
      postedJobs: firebase.firestore.FieldValue.arrayRemove(post)
     });
     this.jobsService.getMyJobs();
     this.jobsService.getPostedJobs();
     this.router.navigate(['../jobs']);
     this.router.navigate(['tabs']);

    let posterId = this.jobsService.selectedjob.uid;
    this.messageService.startNewConvo(this.user.uid, posterId);
  }

  async removeJob(post){
    if (post.uid == this.user.uid) {   
      // this.db.collection('users').doc(this.user.uid).update({
      //   postedJobs: firebase.firestore.FieldValue.arrayRemove(post)
      // });
    
      await this.db.collection('postedJobs').doc('jobs').update({
       postedJobs: firebase.firestore.FieldValue.arrayRemove(post)
      });

      this.jobsService.getPostedJobs();
      this.jobsService.getMyJobs();
      this.router.navigate(['../jobs']);
      this.router.navigate(['tabs']);
   } else {
      alert("This is not your post");
   }

   let posterId = this.jobsService.selectedjob.uid;
   this.messageService.removeConvo(this.user.uid, posterId);
  }

  async rateUser(uid) {
    this.jobsService.rateUser(uid);
  }

  getSelectedUser() {
    this.jobsService.getSelectedUser(this.jobsService.selectedjob.uid);
  }
}
