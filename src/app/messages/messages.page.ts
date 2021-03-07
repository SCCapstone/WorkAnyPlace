import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import firebase from 'firebase/app';
import 'firebase/firestore';

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
    public messageService: MessageService
    ) { }

  logout() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.getMessagePreviews();
  }

  refresh() {
    this.messageService.getMyThreads();
    this.getMessagePreviews();
  }

  getMessagePreviews() {
    // for (let i = 0; i < this.messageService.myThreads.length; i++) {
    //   let currentThread = this.messageService.myThreads[i];
    //   console.log(currentThread);
    // }
    console.log(this.messageService.getThreads());
  }

  goToConversation() {
    this.router.navigate(['/conversation']);
  }

}
