import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobsService } from '../jobs.service'

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.page.html',
  styleUrls: ['./create-job.page.scss'],
})
export class CreateJobPage implements OnInit {

  create_job_form: FormGroup;
  constructor(private router: Router, 
    public formBuilder: FormBuilder,
    public jobsService: JobsService) { }

  ngOnInit() { 
    this.create_job_form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      pay: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  createJob(value) {

    this.jobsService.postJob(value.title,value.pay,value.category,value.description);
    this.router.navigate(['../jobs']);
    this.router.navigate(['../tabs']);
  }
}
