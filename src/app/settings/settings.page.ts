import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth
    ) { }

  ngOnInit() {
  }

  backToStats() {
    this.router.navigate(['/stats']);
  }

  goToImage() {
    this.router.navigate(['../profile-pic-update']);
  }

  logout() {
    this.fireAuth.signOut();
    this.router.navigate(['/login']);
  }


}


