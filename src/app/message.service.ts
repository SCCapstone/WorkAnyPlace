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
    
    let threads = [];
    // threadIds.forEach(async function(threadId) {
    //   let thread = await this.db.collection('messages').doc(threadId).get().then(function(doc) {
    //     if (doc.exists) {
    //       return doc.data().sentMessages;
    //     } else {
    //       console.log("No such document");
    //     }
    //   }).catch(function(error) {
    //     console.log("Error getting document:", error);
    //   });
    //   threads.push(thread);
    // });
    for (let i = 0; i < threadIds.length; i++) {
      let currentId = threadIds[i];
      let thread = await this.db.collection('messages').doc(currentId).get().then(function(doc) {
        if (doc.exists) {
          return doc.data().sentMessagse;
        } else {
          console.log("No such document");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
      threads.push(thread);
    }

    console.log(threads);
    
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
