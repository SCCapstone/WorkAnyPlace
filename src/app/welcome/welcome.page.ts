import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToFindJobs() {  // finishes logging in after skip button is clicked
    this.router.navigate(['/jobs']);
    this.router.navigate(['/tabs']);
  }

}
