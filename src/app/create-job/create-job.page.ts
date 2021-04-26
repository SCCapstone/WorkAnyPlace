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

    var state = value.location.split(", ");
    var state2 = state[1];
    if(state2 == 'AL' || state2 == 'AK' || state2 == 'AS' || state2 == 'AZ' || state2 == 'AR' || state2 == 'CA' || state2 == 'CO' || state2 == 'CT' ||  state2 == 'DE' || state2 == 'DC' || state2 == 'FL' || state2 == 'GA' || state2 == 'HI' || state2 == 'ID' || state2 == 'IL' || state2 == 'IN' || state2 == 'IA' || state2 == 'KS' || state2 == 'KY' || state2 == 'LA' || state2 == 'ME' || state2 == 'MD' || state2 == 'MA' || state2 == 'MI' || state2 == 'MN' || state2 == 'MS' || state2 == 'MO' || state2 == 'MT' || state2 == 'NE' || state2 == 'NV' || state2 == 'NH' || state2 == 'NJ' || state2 == 'NM' || state2 == 'NY' || state2 == 'NC' || state2 == 'ND' || state2 == 'OH' || state2 == 'OK' || state2 == 'OR' || state2 == 'PA' || state2 == 'RI' || state2 == 'SC' || state2 == 'SD' || state2 == 'TN' || state2 == 'TX' || state2 == 'UT' || state2 == 'VT' || state2 == 'VA' || state2 == 'WA' || state2 == 'WV' || state2 == 'WI' || state2 == 'WY') {
     
      this.jobsService.jobToPost = value;
      this.router.navigate(['/post-pics']);
      
    } else {
      alert('Enter a valid state abbreviation');
      return;
    }
    
  }
}