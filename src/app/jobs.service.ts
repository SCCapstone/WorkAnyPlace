import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor() {

   }
   db = firebase.firestore();
   user = firebase.auth().currentUser;

   posts:Array<any>=[{"title":"Lawn Care","pay":7.99,"category":"Yard Work", "description":"I need help cutting my grass."},{"title":"JOB 2","pay":7.20,"category":"Yard Work", "description":"I need help cutting my grass."}];


   postJob(title,pay,category,description){
    this.posts.push({
      'title': title,
      'pay': pay,
      'Category': category,
      'description': description
    }); 
  }

  removeJob(title,pay,category,description){
    const job = {
      'title': title,
      'pay' : pay,
      'Category': category,
      'description': description
    };
    this.posts.forEach((element,index)=> {
      if(element.title==job.title) this.posts.splice(index,1);
    });
    this.posts.forEach(object => console.log(object.title));
  }


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

// async getAcceptedJobs() {
//    var jobs = await this.db.collection('users').doc(this.user.uid).get().then(function(doc) {
//       if (doc.exists) {
//          console.log("Document data:", doc.data());
//          return doc.data().acceptedJobs;
//         } else {
//           // doc.data() will be undefined in this case
//          console.log("No such document!");
//       }
//     }).catch(function(error) {
//       console.log("Error getting document:", error);
//     }); 

//     return jobs;
// }

// async getPostedJobs() {
//   var jobs = await this.db.collection('postedJobs').doc('jobs').get().then(function(doc) {
//      if (doc.exists) {
//         console.log("Document data:", doc.data());
//         return doc.data().postedJobs;
//        } else {
//          // doc.data() will be undefined in this case
//         console.log("No such document!");
//      }
//    }).catch(function(error) {
//      console.log("Error getting document:", error);
//    }); 

//    return jobs;
// }

addPostedJobs(job) {
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




}