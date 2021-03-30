import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() {
    this.fetchThreads();
  }

  db = firebase.firestore();
  user = firebase.auth().currentUser;
  myThreads = [];
  currentThreadId = null;

  getMyThreads() {
    return this.myThreads;
  }

  getCurrentThreadId() {
    return this.currentThreadId;
  }

  setCurrentThreadId(id) {
    this.currentThreadId = id;
  }

  async fetchThreads() {
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
    for (let i = 0; i < threadIds.length; i++) {
      let currentId = threadIds[i];
      let thread = await this.db.collection('messages').doc(currentId).get().then(function(doc) {
        if (doc.exists) {
          return doc.data().sentMessages;
        } else {
          console.log("No such document");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
      threads.push(thread);
    }
    this.myThreads = threads;
  }

  async getUsernameFromId(uid) {
    let username = await this.db.collection('users').doc(uid).get().then(function(doc) {
      if (doc.exists) {
        return doc.data().username;
      } else {
        console.log("No such document");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
    return username;
  }

  startNewConvo(user1Id, user2Id) {
    let newThreadId;
    if (user1Id < user2Id) {
      newThreadId = user1Id.concat(user2Id.toString());
    } else {
      newThreadId = user2Id.concat(user1Id.toString());
    }

    let sentMessages = [{
      messageText: "Hello! I have accepted your job.",
      receiverId: user2Id,
      senderId: user1Id,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date())
    }];
    this.db.collection("messages").doc(newThreadId).set({
      sentMessages: sentMessages
    });

    this.db.collection("userMessageThreads").doc(this.user.uid).update({
      threads: firebase.firestore.FieldValue.arrayUnion(newThreadId)
    });
  }

  removeConvo(user1Id, user2Id) {
    let threadId;
    if (user1Id < user2Id) {
      threadId = user1Id.concat(user2Id.toString());
    } else {
      threadId = user2Id.concat(user1Id.toString());
    }

    this.db.collection("messages").doc(threadId).delete().then(() => {
      console.log("Document delted");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });

    this.db.collection("userMessageThreads").doc(this.user.uid).update({
      threads: firebase.firestore.FieldValue.arrayRemove(threadId)
    });
  }
}
