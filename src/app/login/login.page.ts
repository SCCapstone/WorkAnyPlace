import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import firebase from 'firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  

  new_product_form: FormGroup;
  

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.new_product_form = this.formBuilder.group({  //signin fields of email and password
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  } 

  async login(item) {
    let success: boolean = true;
    const user = await this.afAuth.signInWithEmailAndPassword(  //Angular way authenticating if account exists
      item.email,
      item.password
    ).catch((error) => {
      alert(error.message);
      success = false;
    });

    console.log(user);
    
    if (!success) {  // doesn't login if account information is invalid
      return;
    }

    this.router.navigate(['/jobs']);  // logs in to Find Jobs page
    this.router.navigate(['/tabs']);  // adds tab at bottom
    this.new_product_form.reset();
}

signup() {
  this.router.navigate(['/signup']);  // takes to signup page for new account
}



resetPassword() {

  this.router.navigate(['/reset-password']);  // take to reset password page if password is forgotten
/*
var auth = firebase.auth();

auth.sendPasswordResetEmail(emailAddress).then(function() {
  // Email sent.
}).catch(function(error) {
  // An error happened.
*/
}

}