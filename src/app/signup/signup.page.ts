import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  new_product_form: FormGroup;
  db = firebase.firestore();

  constructor(public afAuth: AngularFireAuth, private router: Router, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.new_product_form = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required)
    });

  }

  async createAccount(item) {
    const user = await this.afAuth.createUserWithEmailAndPassword(
      item.email,
      item.password
    ).then(function() {
      var db = firebase.firestore();
      db.collection("users").doc(firebase.auth().currentUser.uid).set({
        acceptedJobs: [],
        postedJobs: [],
        email: item.email,
        group: item.group,
        hoursWorked: 0,
        jobsCompleted: 0,
        jobsCreated: 0,
        moneyMade: 0.00,
        starRating: 0,
        username: item.username
      })
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });

    }).catch(function(error) {
      alert(error.message);
      console.error("Error writing document: ", error);
    });
  
      console.log(user);
     
     
      this.router.navigate(['/jobs']);
      this.router.navigate(['/tabs']);
  }

  
  back() {
    this.router.navigate(['/login'])
  }
}
