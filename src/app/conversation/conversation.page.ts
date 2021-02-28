import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  messages = [
    {
      user: 'Nick',
      createdAt: 15544090856000,
      msg: 'Hey, how are you?'
    },
    {
      user: 'Brandon',
      createdAt: 155440924235,
      msg: 'Working for Work Any Place, you?'
    },
    {
      user: 'Nick',
      createdAT: 155440924235,
      msg: 'Same me too!'
    },
  ];

  currentUser = 'Nick';
  newMsg = '';
  
  constructor() { }

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
