import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {


  constructor(private router: Router,public jobsService: JobsService) { }

  posts = [];

  ngOnInit() {
    this.posts = this.jobsService.posts;
  }

  openCreateJob() {
    
    this.router.navigate(['/create-job']);
  }
} 

