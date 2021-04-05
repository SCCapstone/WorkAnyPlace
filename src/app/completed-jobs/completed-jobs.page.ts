import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-completed-jobs',
  templateUrl: './completed-jobs.page.html',
  styleUrls: ['./completed-jobs.page.scss'],
})
export class CompletedJobsPage implements OnInit {

  db = firebase.firestore();
  user = firebase.auth().currentUser;
  myCompletedJobs;

  constructor(
    public jobsService: JobsService, 
    private router: Router, 
    public alertController: AlertController
  ) { }

  async ngOnInit() {
    this.myCompletedJobs = await this.jobsService.getMyCompletedJobs();
  }

  async refresh() {
    this.myCompletedJobs = await this.jobsService.getMyCompletedJobs();
  }

  async addToCompletedJobs(post){
    this.jobsService.addAcceptedJob(post);
    await this.db.collection('postedJobs').doc('jobs').update({
      postedJobs: firebase.firestore.FieldValue.arrayRemove(post)
     });
     this.jobsService.getMyJobs();
     this.router.navigate(['../my-jobs']);
     this.refresh();
  }



}
