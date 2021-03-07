import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() {
    this.getMyThreads()
  }

  db = firebase.firestore();
  user = firebase.auth().currentUser;

  myThreads

  async getMyThreads() {
    // regex to find user ID in thread ID
    // let regex = new RegExp(this.user.uid);
    let threadIds = await this.db.collection('userMessageThreads').doc(this.user.uid).get().then(function(doc) {
      if (doc.exists) {
        return doc.data().threads;
      } else {
        console.log("No such document");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
    
    
  }

  async startNewConvo(user1, user2) {
    let threadId:any;
    if (user1.uid < user2.uid) {
      threadId = user1.uid + user2.uid;
    }
    else {
      threadId = user2.uid + user1.uid;
    }
    console.log(threadId);
  }
}
