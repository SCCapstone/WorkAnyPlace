import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { NONE_TYPE } from '@angular/compiler';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  db = firebase.firestore();
  user = firebase.auth().currentUser;
  previews = [];

  constructor(
    private router: Router,
    public messageService: MessageService,
    private fireAuth: AngularFireAuth
    ) { }

  async ngOnInit() {
    await this.messageService.fetchThreads();
    this.getMessagePreviews();
  }

  logout() {  // logs out, reloading window so previous login information is not retained
    this.fireAuth.signOut().then(() => {
      console.log("signed out")
    })
    firebase.auth().signOut();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
  
  async refresh() {  // fetches new messages on messages screen
    await this.messageService.fetchThreads();
    this.getMessagePreviews();
  }

  async getMessagePreviews() {  // shows most recent message in conversation
    let newPreviews = [];
    let myThreads = this.messageService.getMyThreads();
    for (let i = 0; i < myThreads.length; i++) {
      let lastMessage = myThreads[i][myThreads[i].length - 1];
      let recId = lastMessage.receiverId;
      let sendId = lastMessage.senderId;
      let threadMemberId;
      let threadId;
      if (recId == this.user.uid) {
        threadMemberId = sendId;
      } else {
        threadMemberId = recId;
      }
      if (recId < sendId) {
        threadId = recId + sendId;
      } else {
        threadId = sendId + recId;
      }
      let threadMemberUsername = await this.messageService.getUsernameFromId(threadMemberId);
      newPreviews.push({
        messageText:lastMessage.messageText,
        timeStamp:lastMessage.timestamp,
        threadMember:threadMemberUsername,
        threadId:threadId
      });
    }
    this.previews = newPreviews;
  }

  goToConversation(conversationPreview) {  // goes to specific conversation based on thread id
    this.messageService.setCurrentThreadId(conversationPreview.threadId);
    this.router.navigate(['/conversation']);
  }

}
