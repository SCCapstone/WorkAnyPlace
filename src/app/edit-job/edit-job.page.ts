import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { JobsService } from '../jobs.service'
import firebase from 'firebase/app';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.page.html',
  styleUrls: ['./edit-job.page.scss'],
})
export class EditJobPage implements OnInit, AfterViewInit{

  job
  edit_job_form: FormGroup;

  db = firebase.firestore();
  constructor(
    private router: Router,
    private route:ActivatedRoute,
    public formBuilder: FormBuilder,
    public jobsService: JobsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
  		param=>{
  			this.job = param;
  		}
  	)

    this.edit_job_form = this.formBuilder.group({
      title: new FormControl(this.jobsService.selectedjob.title, Validators.required),
      pay: new FormControl(this.jobsService.selectedjob.pay, Validators.required),
      location: new FormControl(this.jobsService.selectedjob.location, Validators.required),
      category: new FormControl(this.jobsService.selectedjob.category, Validators.required),
      description: new FormControl(this.jobsService.selectedjob.description, Validators.required)
    });
  }

  ngAfterViewInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.jobsService.getPosts(id).subscribe(noteData => {
        this.job = noteData;
      });
    }
  }

  async updateJob(value) {
    if(value.pay < 0.01 || value.pay > 9999.99) {
      alert('Enter a price between $0.01 and $9999.99');
      return;
    }
   
    await this.db.collection('users').doc(this.jobsService.selectedjob.uid).update({
      postedJobs: firebase.firestore.FieldValue.arrayRemove(this.jobsService.selectedjob)
    });
    await this.db.collection('postedJobs').doc('jobs').update({
      postedJobs: firebase.firestore.FieldValue.arrayRemove(this.jobsService.selectedjob)
    });
    this.jobsService.selectedjob.title = value.title;
    this.jobsService.selectedjob.pay = value.pay;
    this.jobsService.selectedjob.location = value.location;
    this.jobsService.selectedjob.category = value.category;
    this.jobsService.selectedjob.description = value.description;

    this.jobsService.jobToPost = this.jobsService.selectedjob;
    await this.jobsService.addNewPostedJob();
    this.jobsService.getPostedJobs();

    this.router.navigate(['jobs']);
    this.router.navigate(['tabs']);
  }



}
