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


  constructor(public afAuth: AngularFireAuth, private router: Router, public formBuilder: FormBuilder) { }

  ngOnInit() {

    this.new_product_form = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  } 

  async login(item) {

    const user = await this.afAuth.signInWithEmailAndPassword(
      item.email,
      item.password
    ).catch((error) => {
      alert(error.message);
    });;

    console.log(user);
    

    this.router.navigate(['/jobs']);
    this.router.navigate(['/tabs']);
}

signup() {
  this.router.navigate(['/signup']);
}


  }


