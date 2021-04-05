import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.jobsService.getMyPostedJobs();

  }

  refresh() {
    this.jobsService.getPostedJobs();

  }
}
