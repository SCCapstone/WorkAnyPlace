import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.page.html',
  styleUrls: ['./my-jobs.page.scss'],
})
export class MyJobsPage implements OnInit {

  db = firebase.firestore();
  user = firebase.auth().currentUser;

  constructor(
    public jobsService: JobsService, 
    private router: Router, 
    public alertController: AlertController
    
    ) { }

  ngOnInit() {
    this.getAcceptedJobs();
  }

  refresh() {
    this.getAcceptedJobs();
  }

  getAcceptedJobs() {
    this.jobsService.getMyJobs()
  }

 async cancelJob(job) {
  await this.jobsService.cancelMyJob(job)
  this.jobsService.getPostedJobs()
  this.refresh()
 }

 async completeJob(job) {
  await this.jobsService.completeMyJob(job)
  this.jobsService.getPostedJobs()
  this.refresh()
 }

 completeJobConfirm(job) {
  this.alertController.create({
    header: 'Did you complete this job?',
    subHeader: 'Thank you for completing this job',
    message: 'Job will be removed from your jobs and the owner will be notified',
    buttons: [  
      {
        text: 'Yes',
        handler: () => {
          this.completeJob(job)
        }
      },
      {
        text: 'No',
        handler: () => {
          
        }
      }
    ]
  }).then(res => {
    res.present();
  });
}
 
 removeJobConfirm(job) {
  this.alertController.create({
    header: 'Are  you sure?',
    subHeader: 'Are you sure you want to cancel job?',
    message: 'Job will be removed from your jobs and the owner will be notified',
    buttons: [  
      {
        text: 'Yes',
        handler: () => {
          this.cancelJob(job)
        }
      },
      {
        text: 'No',
        handler: () => {
          
        }
      }
    ]
  }).then(res => {
    res.present();
  });
}

  logout() {   
   this.router.navigate(['/login']);
  }

}


