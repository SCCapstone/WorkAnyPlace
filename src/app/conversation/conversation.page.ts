import { Component, OnInit, ViewChild } from '@angular/core';

import { JobsService } from '../jobs.service';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  /* Service Variables */
  db = firebase.firestore();
  user = firebase.auth().currentUser;
  messages = [];
  otherUser;
  threadId;
  newMsg = '';
  
  constructor(
    public jobsService: JobsService,
    public messageService: MessageService,
    private router: Router,
    public alertController: AlertController
    
    ) { }

  sendMessage() {
    let collectionRef = this.db.collection("messages").doc(this.threadId);
    const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
    collectionRef.update({
      sentMessages: firebase.firestore.FieldValue.arrayUnion({
        messageText: this.newMsg,
        receiverId: this.otherUser,
        senderId: this.user.uid,
        timestamp: timestamp,
      })
    });
    this.messages.push({
      user: "Me",
      createdAt: timestamp.toDate(),
      msg: this.newMsg
    });
    this.newMsg = '';
  }

  async updateMessages() {
    let thread = await this.getCurrentThread(this.threadId);
    for (let i = 0; i < thread.length; i++) {
      let currentMessage = thread[i];
      let name;
      if (this.user.uid == currentMessage.senderId) {
        name = "Me";
      } else {
        name = await this.messageService.getUsernameFromId(currentMessage.senderId);
      }
      this.messages.push({
        user:name,
        createdAt:currentMessage.timestamp.toDate(),
        msg:currentMessage.messageText
      });
    }
  }

  async getCurrentThread(threadId) {
    let thread = await this.db.collection('messages').doc(threadId).get().then(function(doc) {
      if (doc.exists) {
        return doc.data().sentMessages;
      } else {
        console.log("No such document");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
    return thread;
  }

  getOtherUser(threadId) {
    let firstId = threadId.substring(0, threadId.length / 2);
    let secondId = threadId.substring(threadId.length / 2, threadId.length);
    if (firstId == this.user.uid) {
      this.otherUser = secondId;
    } else {
      this.otherUser = firstId;
    }
  }

  async ngOnInit() {
    this.threadId = this.messageService.getCurrentThreadId();
    this.getOtherUser(this.threadId);
    this.updateMessages();
  }

}
