import { Component, NgZone } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fireAuth: AngularFireAuth,
    private router: Router,
    private zone: NgZone
  ) {
    this.initializeApp();
  }

  initializeApp() {
    
    this.platform.ready().then(() => {
      this.fireAuth.onAuthStateChanged(user => {
        if (user) {
          console.log("SESSION")
          this.zone.run(() => {
            this.router.navigate(["/jobs"]);
            this.router.navigate(['/tabs']);
          });
          
          this.splashScreen.hide();
        }
        else {
          console.log("NEW")
          this.zone.run(() => {
            this.router.navigate(["/login"]);
          });
          this.splashScreen.hide();
        }
      })
      this.statusBar.styleDefault();
    });
  }
}
