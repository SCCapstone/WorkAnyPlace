import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class JobsService {

  constructor() {
    this.getPostedJobs()
   }


/*************************************************************/
/* Service Varibles */
  db = firebase.firestore();
  user = firebase.auth().currentUser;

/* Varibles used accross components */
  posts
  postsNew
  myjobs
  selectedjob
//////////////////////////////////////////////////////////////


/* Retrieve from Firestore and uppdate variables *///////////////////////////////////////////////////////////
  async getPostedJobs() {
    var jobs = await this.db.collection('postedJobs').doc('jobs').get().then(function(doc) {
       if (doc.exists) {
          console.log("Document data:", doc.data());
          return doc.data().postedJobs;
         } else {
           // doc.data() will be undefined in this case
          console.log("No such document!");
       }
     }).catch(function(error) {
       console.log("Error getting document:", error);
     }); 
     this.posts = jobs;
     this.postsNew = jobs;
  }

  async getMyJobs() {
    var jobs = await this.db.collection('users').doc(this.user.uid).get().then(function(doc) {
       if (doc.exists) {
          console.log("Document data:", doc.data().acceptedJobs);
          return doc.data().acceptedJobs;
         } else {
           // doc.data() will be undefined in this case
          console.log("No such document!");
       }
     }).catch(function(error) {
       console.log("Error getting document:", error);
     }); 
     this.myjobs = jobs
 }

 setSelectedJob(job) {
   this.selectedjob = job;
 }


/*********************************************************************************************************/

/* Push to Firestore *////////////////////////////////////////////////////////////////////////

/* Add to users accepted Jobs */
  addAcceptedJob(post) {
  
    this.db.collection('users').doc(this.user.uid).get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        var db = firebase.firestore();
        var user = firebase.auth().currentUser;

        db.collection('users').doc(user.uid).set({
          email: doc.data().email,
          group: doc.data().group,
          hoursWorked: doc.data().hoursWorked,
          jobsCompleted: doc.data().jobsCompleted,
          jobsCreated: doc.data().jobsCreated,
          moneyMade: doc.data().moneyMade,
          starRating: doc.data().starRating,
          username: doc.data().username,
          postedJobs: doc.data().postedJobs,
          acceptedJobs: firebase.firestore.FieldValue.arrayUnion(post)
         
      }, { merge: true });

        
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
  }

/* Use this function when adding a newly created Job */
  addNewPostedJob(job) {
    this.db.collection('users').doc(this.user.uid).get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        var db = firebase.firestore();
        var user = firebase.auth().currentUser;

        db.collection('users').doc(user.uid).set({
          email: doc.data().email,
          group: doc.data().group,
          hoursWorked: doc.data().hoursWorked,
          jobsCompleted: doc.data().jobsCompleted,
          jobsCreated: doc.data().jobsCreated+1,
          moneyMade: doc.data().moneyMade,
          starRating: doc.data().starRating,
          username: doc.data().username,
          acceptedJobs: doc.data().acceptedJobs,
          postedJobs: firebase.firestore.FieldValue.arrayUnion(job)
         
      }, { merge: true });

     db.collection('postedJobs').doc('jobs').set({
        postedJobs: firebase.firestore.FieldValue.arrayUnion(job)
      }, { merge: true });

        
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    }).catch(function(error) {
    console.log("Error getting document:", error);
    });
  }

/* Use this function when adding an already existing job back to posted jobs
   Example: someone cancels job so it needs to be added back to posted jobs */
  addBackToPostedJobs(post) {
    this.db.collection('postedJobs').doc('jobs').update({
      postedJobs: firebase.firestore.FieldValue.arrayUnion(post)
    });
    this.getPostedJobs();
  }


/*********************************************************************************************************/


/* removes from accepted Jobs */
  async cancelMyJob(job) {
  //Removes Job Locally

    /*
     * 
     * this.posts.forEach((element,index)=> {
     *  if(element.title==job.title) this.posts.splice(index,1);
     * });
     * this.posts.forEach(object => console.log(object.title));
     *
     */

    
    // Removes Job from Firestore from users acceptedJobs array  
    await this.db.collection('users').doc(this.user.uid).update({
     acceptedJobs: firebase.firestore.FieldValue.arrayRemove(job)
    });

    // Add job back to posts
    this.addBackToPostedJobs(job);

    // Refresh Pages
    this.getPostedJobs();
    this.getMyJobs();
  }

}