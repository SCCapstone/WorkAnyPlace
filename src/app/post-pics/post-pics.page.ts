import { Component, OnInit } from '@angular/core';
import {JobsService} from '../jobs.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-pics',
  templateUrl: './post-pics.page.html',
  styleUrls: ['./post-pics.page.scss'],
})
export class PostPicsPage implements OnInit {

  constructor(public jobsService: JobsService, private router: Router) { }

  ngOnInit() {
  }

  async postJob() {
    await this.jobsService.addNewPostedJob();
    this.jobsService.getPostedJobs();
    this.router.navigate(['/jobs']);
    this.router.navigate(['/tabs']);
  }

  cancelPost() {
    this.jobsService.jobToPost = undefined;
    this.jobsService.postPicsToUpload = [];
    this.router.navigate(['/jobs']);
    this.router.navigate(['/tabs']);
  }

}
