import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-created-jobs',
  templateUrl: './created-jobs.page.html',
  styleUrls: ['./created-jobs.page.scss'],
})
export class CreatedJobsPage implements OnInit {

  db = firebase.firestore();
  user = firebase.auth().currentUser;

  constructor(
    public jobsService: JobsService, 
    private router: Router, 
    public alertController: AlertController,
    private fireAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.jobsService.getMyPostedJobs();

  }

  refresh() {
    this.jobsService.getPostedJobs();

  }

  logout() { 
    this.fireAuth.signOut();  
    this.router.navigate(['/login']);
   }

}
