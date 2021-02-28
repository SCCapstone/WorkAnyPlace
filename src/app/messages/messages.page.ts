import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  constructor(private router: Router) { }

  logout() {
    
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

  goToConversation() {
    this.router.navigate(['/conversation']);
  }

}
