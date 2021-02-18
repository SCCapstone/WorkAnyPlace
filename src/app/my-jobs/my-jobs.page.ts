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


  acceptedJobs;
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

  async getAcceptedJobs() {
    var jobs = await this.db.collection('users').doc(this.user.uid).get().then(function(doc) {
       if (doc.exists) {
          console.log("Document data:", doc.data().acceptedJobs);
          return doc.data().acceptedJobs;
         } else {
           // doc.data() will be undefined in this case
          console.log("No such document!");
       }
     }).catch(function(error) {
       console.log("Error getting document:", error);
     }); 
 
     this.acceptedJobs = jobs;
 }

 removeJob(job) {

  this.jobsService.removeJob(job)
  this.refresh()
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
          this.removeJob(job)
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


