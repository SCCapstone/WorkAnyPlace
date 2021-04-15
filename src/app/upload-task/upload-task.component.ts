import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {JobsService} from '../jobs.service';


@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss'],
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;

  task: AngularFireUploadTask;
  user = firebase.auth().currentUser;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, public jobsService: JobsService) { }

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {

    // Validation for Images Only
    if (this.file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type');
      alert("Unsupported file try again");
      return;
     }

    // The storage path
    const path = `postpics/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        // this.db.collection('users').doc(this.user.uid).update({posts: firebase.firestore.FieldValue.arrayUnion(path)})
        this.jobsService.postPicsToUpload.push(this.downloadURL);
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}


