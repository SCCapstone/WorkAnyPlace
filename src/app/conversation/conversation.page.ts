import { Component, OnInit, ViewChild } from '@angular/core';

import { JobsService } from '../jobs.service';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  /* Service Variables */
  db = firebase.firestore();
  user = firebase.auth().currentUser;
  
  messages = [
    {
      user: 'Me',
      createdAt: 155440924235,
      msg: 'Hey there how are you, I have accepted your Work Any Place Job and am excited to work!'
    },
    {
      user: 'Brandon',
      createdAt: 155440924235,
      msg: 'Awesome, thank you so much, looking forward to meeting you. When are you available?'
    },
    {
      user: 'Me',
      createdAt: 155440924235,
      msg: 'I am available this upcoming Tuesday, My number is 703-555-3333'
    },
  ];

  currentUser = 'Me';
  newMsg = '';
  
  constructor(
    public jobsService: JobsService,
    private router: Router,
    public alertController: AlertController
    
    ) { }

  sendMessage() {
    this.messages.push({
      user: 'Nick',
      createdAt: new Date().getTime(),
      msg: this.newMsg
    });

    this.newMsg = '';
    /*setTimeout(() =>{
    this.content.scrollToBottom(200);
    });*/
  }

  ngOnInit() {
  }

}
