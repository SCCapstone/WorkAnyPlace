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
      msg: 'Hey there how are you, I have accepted your Work Any Place Job and am excited to work!'
    },
    {
      user: 'Brandon',
      createdAt: 155440924235,
      msg: 'Awesome, thank you so much, looking forward to meeting you. When are you available?'
    },
    {
      user: 'Nick',
      createdAT: 155440924235,
      msg: 'I am available this upcoming Tuesday, My number is 703-555-3333'
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
