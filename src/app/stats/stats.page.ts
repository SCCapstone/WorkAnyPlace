import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from '../jobs.service';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  db = firebase.firestore();
  user = firebase.auth().currentUser;
  
  constructor(private router: Router, public jobsService: JobsService, private fireAuth: AngularFireAuth) { }

  logout() {
    this.fireAuth.signOut().then(() => {
      console.log("signed out")
    })
    firebase.auth().signOut();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  openSettings() {
    this.router.navigate(['/settings']);
  }

  async ngOnInit() {
    await this.jobsService.getUser();
  }
  
  refresh() {
   this.jobsService.getUser();
  }

  openCompletedJobs() {
    this.router.navigate(['/completed-jobs'])
  }

  openCreatedJobs() {
    this.router.navigate(['/created-jobs'])
  }



}
