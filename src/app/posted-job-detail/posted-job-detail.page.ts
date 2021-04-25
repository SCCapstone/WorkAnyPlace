import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { MessageService } from '../message.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-posted-job-detail',
  templateUrl: './posted-job-detail.page.html',
  styleUrls: ['./posted-job-detail.page.scss'],
})
export class PostedJobDetailPage implements OnInit {

  constructor(public jobsService:JobsService,
    public alertController: AlertController,
    public messageService:MessageService, 
    public router: Router) { }

  db = firebase.firestore();
  user = firebase.auth().currentUser;

    starRating;

  async ngOnInit() {
    await this.getSelectedUser();
  }
  refresh() {
    this.jobsService.getPostedJobs();
    this.jobsService.getMyCompletedJobs();
  }
  async removeJob(post) {
    await this.jobsService.setSelectedJob(post);
    if (post.uid == this.user.uid) {   
      this.db.collection('users').doc(this.user.uid).update({
        postedJobs: firebase.firestore.FieldValue.arrayRemove(post)
      });
    
      await this.db.collection('postedJobs').doc('jobs').update({
       postedJobs: firebase.firestore.FieldValue.arrayRemove(post)
      });

      this.refresh()
      alert("Job successfully removed")
      this.router.navigate(['/my-jobs']);
      this.router.navigate(['/tabs']);
   } else {
      alert("This is not your post");
   }
   this.refresh()
  }

  async editJob(post) {
    
  }

  getSelectedUser() {
    this.jobsService.getSelectedUser(this.jobsService.selectedjob.uid);
    this.starRating = this.jobsService.selectedUser.starRating;
    this.starRating = this.starRating.toFixed(1);
  }
}
