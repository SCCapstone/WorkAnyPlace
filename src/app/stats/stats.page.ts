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

  logout() {  // logs out, reloading window so previous login information is not retained
    this.fireAuth.signOut().then(() => {
      console.log("signed out")
    })
    firebase.auth().signOut();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  openSettings() {  // navigates to settings page if icon is clicked
    this.router.navigate(['/settings']);
  }

  async ngOnInit() {
    await this.jobsService.getUser();
  }
  
  refresh() {  // refreshes stats on dashboard
   this.jobsService.getUser();
  }

  openCompletedJobs() {  // navigates to completed jobs page if Completed Jobs is clicked
    this.router.navigate(['/completed-jobs'])
  }

  openCreatedJobs() {  // navigates to created jobs page if Created Jobs is clicked
    this.router.navigate(['/created-jobs'])
  }



}
