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
      title: new FormControl('', Validators.compose([Validators.maxLength(30),
      Validators.required])),
      pay: new FormControl('', Validators.required),
      location: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z ]+,[ ]?([A-Z]{2})'),  Validators.required])),
      category: new FormControl('', Validators.compose([Validators.maxLength(30),
        Validators.required])),
      description: new FormControl('', Validators.compose([Validators.maxLength(300),
        Validators.required])),
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
    if(value.pay < 0.01 || value.pay > 9999.99) {
      alert('Enter a price between $0.01 and $9999.99');
      return;
    }
    if(value.location != 'AL' && value.location != 'AK' && value.location != 'AS' && value.locatoin != 'AZ' && value.location != 'AR' && value.location != 'CA' && value.location != 'CO' && value.location != 'CT' &&  value.location != 'DE' && value.location != 'DC' && value.location != 'FL' && value.location != 'GA' && value.location != 'HI' && value.location != 'ID' && value.location != 'IL' && value.location != 'IN' && value.location != 'IA' && value.location != 'KS' && value.location != 'KY' && value.location != 'LA' && value.location != 'ME' && value.location != 'MD' && value.location != 'MA' && value.location != 'MI' && value.location != 'MN' && value.location != 'MS' && value.location != 'MO' && value.location != 'MT' && value.location != 'NE' && value.location != 'NV' && value.location != 'NH' && value.location != 'NJ' && value.location != 'NM' && value.location != 'NY' && value.location != 'NC' && value.location != 'ND' && value.location != 'OH' && value.location != 'OK' && value.location != 'OR' && value.location != 'PA' && value.location != 'RI' && value.location != 'SC' && value.location != 'SD' && value.location != 'TN' && value.location != 'TX' && value.location != 'UT' && value.location != 'VT' && value.location != 'VA' && value.location != 'WA' && value.location != 'WV' && value.location != 'WI' && value.location != 'WY') {
      alert('Enter a valid state abbreviation');
      return;
    }
    this.jobsService.jobToPost = value;
    this.router.navigate(['/post-pics']);
  }

}

