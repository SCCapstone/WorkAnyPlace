import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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

  constructor(private router: Router, public jobsService: JobsService, public afAuth: AngularFireAuth) { }

  db = firebase.firestore();
  firebase = firebase;
  user = firebase.auth().currentUser;

  name:string = '';
  username: string =  this.jobsService.currentuser.username;
  email: string =  this.jobsService.currentuser.email;
  group: string = this.jobsService.currentuser.group;

  userDetails:any;

  ngOnInit() {
    this.jobsService.getUser();
    this.userDetails = this.jobsService.currentuser;
    this.name = this.userDetails.username;
    console.log(this.name);
  }

  async refresh() {
    await this.jobsService.getUser();
    this.username =  this.jobsService.currentuser.username;
    this.email =  this.jobsService.currentuser.email;
    this.group= this.jobsService.currentuser.group;
  }

  async updateUserName() {
    await this.db.collection('users').doc(this.user.uid).update({
      username: this.username
    });
    this.refresh();
  }

  
  async updateEmail() {

    
    // this.db.collection('users').doc(this.user.uid).update({
    //   email: this.email
    // });

    var password = this.getPassword();


    var t = this;

    await firebase.auth()
    .signInWithEmailAndPassword(this.user.email, password)
    .then(function(userCredential) {
        var db = firebase.firestore();
        var user = firebase.auth().currentUser;
        userCredential.user.updateEmail(t.email)
        db.collection('users').doc(user.uid).update({
          email: t.email
        });
    })
    this.refresh();
  }
  getPassword() {

    var password = prompt("Please enter your password", "");
    return password;
  }
  async updateGroup() {
    await this.db.collection('users').doc(this.user.uid).update({
      group: this.group
    });

    this.refresh();
  }

  backToStats() {
    this.router.navigate(['/stats']);
  }

  goToImage() {
    this.router.navigate(['../profile-pic-update']);
  }

  changePassword() {
    this.router.navigate(['/reset-password']);
  }
}


