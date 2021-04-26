import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import firebase from 'firebase/app';
import 'firebase/firestore';


export interface MyData {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  new_product_form: FormGroup;
  db = firebase.firestore();

  // Upload Task 
  task: AngularFireUploadTask;

  // Progress in percentage
  percentage: Observable<number>;

  // Snapshot of uploading file
  snapshot: Observable<any>;

  // Uploaded File URL
  UploadedFileURL: Observable<string>;

  //Uploaded Image List
  images: Observable<MyData[]>;

  //File details  
  fileName:string;
  fileSize:number;

   //Status check 
   isUploading:boolean;
   isUploaded:boolean;
 
   private imageCollection: AngularFirestoreCollection<MyData>;

  constructor(public afAuth: AngularFireAuth, private router: Router, public formBuilder: FormBuilder, private storage: AngularFireStorage, private database: AngularFirestore) 
  { this.isUploading = false;
    this.isUploaded = false;
    //Set collection where our documents/ images info will save
    this.imageCollection = database.collection<MyData>('freakyImages');
    this.images = this.imageCollection.valueChanges();
   }

  ngOnInit() {
    this.new_product_form = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([Validators.minLength(6), Validators.maxLength(30),
        Validators.required])),  // password can only be between 6 and 30 characters
      username: new FormControl('', Validators.compose([Validators.maxLength(30),
        Validators.required])),  // username must be 30 characters or less
      group: new FormControl('', Validators.compose([Validators.maxLength(30),
        Validators.required])),  // group must be 30 characters or less
    });

  }

  async createAccount(item) {
    const user = await this.afAuth.createUserWithEmailAndPassword(
      item.email,
      item.password
    ).then(function() {
      var db = firebase.firestore();
      db.collection("users").doc(firebase.auth().currentUser.uid).set({  // sets defaults for all stats
        acceptedJobs: [],
        postedJobs: [],
        email: item.email,
        group: item.group,
        hoursWorked: 0,
        jobsCompleted: 0,
        jobsCreated: 0,
        moneyMade: 0.00,
        starRating: 0,
        starReceived:0,
        totalStars: 0,
        username: item.username,
        completedJobs: []
      })
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });

    }).catch(function(error) {
      alert(error.message);
      console.error("Error writing document: ", error);
    });
  
      console.log(user);
     
     
      // this.router.navigate(['/jobs']);
      // this.router.navigate(['/tabs']);
      this.router.navigate(['/image-upload']);  // takes to upload profile picturue page next
  }
  uploadFile(event: FileList) {
    

    // The File object
    const file = event.item(0)

    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') { 
     console.error('unsupported file type :( ')
     return;
    }

    this.isUploading = true;
    this.isUploaded = false;


    this.fileName = file.name;

    // The storage path
    const path = `profilePics/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'Profile Pic' };

    //File reference
    const fileRef = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      
      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();
        
        this.UploadedFileURL.subscribe(resp=>{
          this.addImagetoDB({
            name: file.name,
            filepath: resp,
            size: this.fileSize
          });
          this.isUploading = false;
          this.isUploaded = true;
        },error=>{
          console.error(error);
        })
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    )
  }

  addImagetoDB(image: MyData) {
    //Create an ID for document
    const id = this.database.createId();

    //Set document id with value in database
    this.imageCollection.doc(id).set(image).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("error " + error);
    });
  }


  
  back() {
    this.router.navigate(['/login'])
  }
}
