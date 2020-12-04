import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private router: Router) { }

  logout() {
      
    this.router.navigate(['/login']);
  }

  backToStats() {
    this.router.navigate(['/stats']);
  }

  ngOnInit() {
  }

}
