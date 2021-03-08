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

  async ngOnInit() {
    await this.messageService.fetchThreads();
    this.getMessagePreviews();
  }

  async refresh() {
    await this.messageService.fetchThreads();
    this.getMessagePreviews();
  }

  getMessagePreviews() {
    let newPreviews = [];
    let myThreads = this.messageService.getMyThreads();
    for (let i = 0; i < myThreads.length; i++) {
      let currentThread = myThreads[i];
      newPreviews.push(currentThread[0].messageText);
    }
    this.previews = newPreviews;
  }

  goToConversation() {
    this.router.navigate(['/conversation']);
  }

}
