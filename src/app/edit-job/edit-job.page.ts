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
  constructor(
    private router: Router,
    private route:ActivatedRoute,
    public formBuilder: FormBuilder,
    public jobsService: JobsService
  ) { }

  ngAfterViewInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.jobsService.getPosts(id).subscribe(noteData => {
        this.job = noteData;
      });
    }
  }

  ngOnInit() {
    this.route.params.subscribe(
  		param=>{
  			this.job = param;
  		}
  	)
    this.edit_job_form = this.formBuilder.group({
      title: new FormControl(this.jobsService.editTitle, Validators.required),
      price: new FormControl(this.jobsService.editPay, Validators.required),
      category: new FormControl(this.jobsService.editLocation, Validators.required),
      url: new FormControl(this.jobsService.editCategory, Validators.required),
      description: new FormControl(this.jobsService.editDescription, Validators.required)
    });
  }

  updateJob(value) {
    this.jobsService.jobToPost = value;
    
  }



}
