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
  selector: 'app-image-upload',
  templateUrl: './image-upload.page.html',
  styleUrls: ['./image-upload.page.scss'],
})
export class ImageUploadPage implements OnInit {

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

   //Status check 
   isUploading:boolean;
   isUploaded:boolean;
 
   private imageCollection: AngularFirestoreCollection<MyData>;

  constructor(public afAuth: AngularFireAuth, private router: Router, public formBuilder: FormBuilder, private storage: AngularFireStorage, private database: AngularFirestore, public jobsService: JobsService) 
  { this.isUploading = false;
    this.isUploaded = false;
    //Set collection where our documents/ images info will save
    this.imageCollection = database.collection<MyData>('profilePics');
    this.images = this.imageCollection.valueChanges();
   }

  ngOnInit() {
   
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
    const id = this.user.uid;

    //Set document id with value in database
    this.db.collection('profilePics').doc(this.user.uid).set(image).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("error " + error);
    });
  }

  uploadDefault() {
    console.log(this.user.uid);

    const path = `https://firebasestorage.googleapis.com/v0/b/workanyplace-62a66.appspot.com/o/profilePics%2F1619308598408_work_any_place_logo.png?alt=media&token=dbb884db-353d-42d5-b109-c73aef360b04`;

    
    this.addImagetoDB({
      name: "work_any_place_logo.png",
      filepath: path,
      size: 76394
    });
    this.goToWelcome();
    }

 
  goToJobs() {
    this.jobsService.getProfilePic();
    this.router.navigate(['/jobs']);
    this.router.navigate(['/tabs']);
  }

  goToWelcome() {
    this.jobsService.getProfilePic();
    this.router.navigate(['/welcome']);
  }

}
