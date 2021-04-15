import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobsService } from '../jobs.service'

import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.page.html',
  styleUrls: ['./create-job.page.scss'],
})
export class CreateJobPage implements OnInit {
  db = firebase.firestore();
  user = firebase.auth().currentUser;

  create_job_form: FormGroup;
  constructor(private router: Router, 
    public formBuilder: FormBuilder,
    public jobsService: JobsService) { }

  ngOnInit() { 
    
    this.create_job_form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      pay: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      uid: this.user.uid,
      pics: []
    });
  }

  goToPics() {
    this.router.navigate(['/post-pics']);
  }

  createJob(value) {
    // await this.jobsService.addNewPostedJob(value);
    // this.jobsService.getPostedJobs();
    // this.router.navigate(['../jobs']);
    // this.router.navigate(['../tabs']);
    if(value.pay < 0.01 || value.pay > 999.99) {
      alert('Enter a price between $0.01 and $999.99');
      return;
    }
    this.jobsService.jobToPost = value;
    this.router.navigate(['/post-pics']);
  }

}

