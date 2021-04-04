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

  updateUserName() {
    this.db.collection('users').doc(this.user.uid).update({
      username: this.username
    });

  }
  updateEmail() {

    
    // this.db.collection('users').doc(this.user.uid).update({
    //   email: this.email
    // });

    var password = this.getPassword();


    var t = this;

    firebase.auth()
    .signInWithEmailAndPassword(this.user.email, password)
    .then(function(userCredential) {
        var db = firebase.firestore();
        var user = firebase.auth().currentUser;
        userCredential.user.updateEmail(t.email)
        db.collection('users').doc(user.uid).update({
          email: t.email
        });
    })
  }
  getPassword() {

    var password = prompt("Please enter your password", "");
    return password;
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


