import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.page.html',
  styleUrls: ['./job-detail.page.scss'],
})
export class JobDetailPage implements OnInit {

  constructor(public jobsService:JobsService) { }

  selectedJob
  defaultimg = '../assets/img/work_any_place_logo.png' 
  ngOnInit() {
    
  }

  getSelectedJob() {

  }

}
