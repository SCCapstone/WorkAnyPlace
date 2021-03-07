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

  constructor(
    private router: Router,
    public messageService: MessageService
    ) { }

  logout() {
    
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

  goToConversation() {
    //this.router.navigate(['/conversation']);
    this.messageService.getMyThreads();
  }

}
