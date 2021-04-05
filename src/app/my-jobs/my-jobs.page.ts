import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MessageService } from '../message.service';


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
    public messageService: MessageService,
    private router: Router, 
    public alertController: AlertController
    
    ) { }

  ngOnInit() {
    this.getAcceptedJobs();
    this.jobsService.getMyPostedJobs();
    this.jobsService.getMyCompletedJobs();
  }

  refresh() {
    this.getAcceptedJobs();
    this.jobsService.getPostedJobs();
    this.jobsService.getMyCompletedJobs();
  }

  getAcceptedJobs() {
    this.jobsService.getMyJobs()
  }

 async cancelJob(job) {
  await this.jobsService.cancelMyJob(job)
  this.jobsService.getPostedJobs()
  this.refresh()

  let posterId = job.uid;
  this.messageService.removeConvo(this.user.uid, posterId);
 }

 async completeJob(job) {
  await this.jobsService.completeMyJob(job)
  this.jobsService.getCompletedJobs()
  this.refresh()

  let posterId = job.uid;
  this.messageService.removeConvo(this.user.uid, posterId);

  var ref = this.db.collection("users").doc(this.user.uid);


  return ref.update({ 
     jobsCompleted: this.jobsService.currentuser.jobsCompleted+1,
     moneyMade: this.jobsService.currentuser.moneyMade+job.pay,
     hoursWorked: this.jobsService.currentuser.hoursWorked+2
  })
  .then(() => {
      console.log("Document successfully updated!");
      this.jobsService.getUser();
  })
  .catch((error) => {
    // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });

 }

  

 completeJobConfirm(job) {
  this.alertController.create({
    header: 'Did you complete this job?',
    subHeader: 'Thank you for completing this job',
    message: 'Job will be removed from your jobs and the owner will be notified',
    buttons: [  
      {
        text: 'Yes',
        cssClass: "alertButtons",
        handler: () => {
          this.completeJob(job)
        }
      },
      {
        text: 'No',
        cssClass: "alertButtons",
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
        cssClass: "alertButtons",
        handler: () => {
          this.cancelJob(job)
        }
      },
      {
        text: 'No',
        cssClass: "alertButtons",
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


