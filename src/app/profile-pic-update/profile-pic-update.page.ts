import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {JobsService } from '../jobs.service'
import firebase from 'firebase/app';
import 'firebase/firestore';


export interface MyData {
  name: string;
  filepath: string;
  size: number;
}
@Component({
  selector: 'app-profile-pic-update',
  templateUrl: './profile-pic-update.page.html',
  styleUrls: ['./profile-pic-update.page.scss'],
})
export class ProfilePicUpdatePage implements OnInit {

  user = firebase.auth().currentUser;
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

  file;

   //Status check 
   isUploading:boolean;
   isUploaded:boolean;

   isSelected:boolean;
 
   private imageCollection: AngularFirestoreCollection<MyData>;

  constructor(public afAuth: AngularFireAuth, private router: Router, public formBuilder: FormBuilder, private storage: AngularFireStorage, private database: AngularFirestore, public jobsService: JobsService) 
  { this.isUploading = false;
    this.isUploaded = false;
    this.isSelected = false;
    //Set collection where our documents/ images info will save
    this.imageCollection = database.collection<MyData>('profilePics');
    this.images = this.imageCollection.valueChanges();
   }

  ngOnInit() {
  }

  showImage(event: FileList) {
     // The File object
     this.file = event.item(0)

     // Validation for Images Only
     if (this.file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
     }
     this.fileName = this.file.name;
     this.isSelected = true;
 
  }
  uploadFile() {
    
    this.isSelected = false;

    // // // The File object
    //  const file = event.item(0)

    // // Validation for Images Only
    // if (file.type.split('/')[0] !== 'image') { 
    //  console.error('unsupported file type :( ')
    //  return;
    // }

    this.isUploading = true;
    this.isUploaded = false;


    // this.fileName = file.name;

    // The storage path
    const path = `profilePics/${new Date().getTime()}_${this.file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'Profile Pic' };

    //File reference
    const fileRef = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file, { customMetadata });

    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      
      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();
        
        this.UploadedFileURL.subscribe(resp=>{
          this.addImagetoDB({
            name: this.fileName,
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
    const id = this.user.uid;

    //Set document id with value in database
    this.db.collection('profilePics').doc(this.user.uid).set(image).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("error " + error);
    });
  }

}
