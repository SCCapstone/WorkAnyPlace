import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = ""
  password: string = ""

  constructor(public auth: AngularFireAuth) { }

  ngOnInit() {
  }

  async login() {
    const { username, password } = this

    try {
      const res = await this.auth.signInWithEmailAndPassword(username,password)
       var user = firebase.app().auth().currentUser;
        //this.itemService.uid = user.uid;
            console.log("login succeeded");
            console.log(user.uid);
      
    }catch(err) {
      console.log(err);
      if (err === 'auth/wrong-password') {
        alert('Wrong password.');
      } else if (err === 'auth/user-not-found'){
        alert("User does not exist");
      } 
      
}
    
  }

}
