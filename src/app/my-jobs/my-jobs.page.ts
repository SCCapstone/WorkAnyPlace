import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.page.html',
  styleUrls: ['./my-jobs.page.scss'],
})
export class MyJobsPage implements OnInit {

  constructor(private router: Router,public jobsService: JobsService) { }

  posts = [];

  logout() {
    
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.posts = this.jobsService.posts;
  }
  removeJob(title,pay,category,description){
    this.jobsService.removeJob(title,pay,category,description);
  }
}
