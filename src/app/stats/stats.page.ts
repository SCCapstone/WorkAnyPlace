import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from '../jobs.service';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  db = firebase.firestore();
  user = firebase.auth().currentUser;

  constructor(private router: Router) { }

  logout() {
    
    this.router.navigate(['/login']);
  }

  openSettings() {
    this.router.navigate(['/settings']);
  }

  ngOnInit() {
  }

  openCompletedJobs() {
    this.router.navigate(['/completed-jobs'])
  }

  openCreatedJobs() {
    this.router.navigate(['/created-jobs'])
  }

}
