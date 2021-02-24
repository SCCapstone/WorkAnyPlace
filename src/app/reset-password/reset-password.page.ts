import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  new_product_form: FormGroup;
  db = firebase.firestore();

  constructor(public afAuth: AngularFireAuth, private router: Router, public formBuilder: FormBuilder) { }

  ngOnInit() {
    var auth = firebase.auth();
    this.new_product_form = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      });
  }

  back() {
    this.router.navigate(['/login'])
  }
}
