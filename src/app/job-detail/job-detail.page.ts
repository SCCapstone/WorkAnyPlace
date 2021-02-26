import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.page.html',
  styleUrls: ['./job-detail.page.scss'],
})
export class JobDetailPage implements OnInit {

  constructor(public jobsService:JobsService, public router: Router) { }

  selectedJob
  defaultimg = '../assets/img/work_any_place_logo.png' 

  db = firebase.firestore();
  user = firebase.auth().currentUser;

  ngOnInit() {
    
  }

  getSelectedJob() {
    this.selectedJob = this.jobsService.selectedjob;
  }

  async addToMyJobs(post){
    this.jobsService.addAcceptedJob(post);
    await this.db.collection('postedJobs').doc('jobs').update({
      postedJobs: firebase.firestore.FieldValue.arrayRemove(post)
     });
     this.jobsService.getMyJobs();
     this.jobsService.getPostedJobs();
     this.router.navigate(['../jobs']);
     this.router.navigate(['tabs']);
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

  }

}
