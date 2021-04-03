import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/firestore';
import {JobsService} from '../jobs.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private router: Router, public jobsService: JobsService) { }

  db = firebase.firestore();
  user = firebase.auth().currentUser;

  name:string = '';
  username: string = '';
  email: string = '';
  group: string = '';

  userDetails:any;

  ngOnInit() {
    this.jobsService.getUser();
    this.userDetails = this.jobsService.currentuser;
    this.name = this.userDetails.username;
    console.log(this.name);
  }

  updateUserName() {
    this.db.collection('users').doc(this.user.uid).update({
      username: this.username
    });

  }
  updateUserEmail() {
    this.db.collection('users').doc(this.user.uid).update({
      email: this.email
    });
  }
  updateGroup() {
    this.db.collection('users').doc(this.user.uid).update({
      group: this.group
    });
  }

  backToStats() {
    this.router.navigate(['/stats']);
  }

  goToImage() {
    this.router.navigate(['../profile-pic-update']);
  }

  logout() {
    this.router.navigate(['/login']);
  }


}


