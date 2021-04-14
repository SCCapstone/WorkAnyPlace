import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class JobsService {
  getPosts: any;

  constructor() {
    this.getPostedJobs()
    this.getCompletedJobs()
   }


/*************************************************************/
/* Service Varibles */
  db = firebase.firestore();
  user = firebase.auth().currentUser;

  postPicsToUpload = [];
  jobToPost = undefined;
/* Varibles used accross components */
  posts;
  postsNew;
  myjobs;
  completedJob;
  myPostedJobs;
  myCompletedJobs;
  selectedjob
  profilepic = "../../assets/img/work_any_place_logo.png";
  currentuser;
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
  async getMyPostedJobs() {
    var jobs = await this.db.collection('users').doc(this.user.uid).get().then(function(doc) {
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
   this.myPostedJobs = jobs;
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

 async getCompletedJobs() {
  var jobs = await this.db.collection('completedJobs').doc('jobs').get().then(function(doc) {
     if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data().completedJobs;
       } else {
         // doc.data() will be undefined in this case
        console.log("No such document!");
     }
   }).catch(function(error) {
     console.log("Error getting document:", error);
   }); 
   this.posts = jobs;
   this.completedJob = jobs;
}
async getMyCompletedJobs() {
  var jobs = await this.db.collection('users').doc(this.user.uid).get().then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      return doc.data().completedJobs;
     } else {
       // doc.data() will be undefined in this case
      console.log("No such document!");
   }
 }).catch(function(error) {
   console.log("Error getting document:", error);
 }); 
 this.myCompletedJobs = jobs;
 return jobs;
}


 setSelectedJob(job) {
   this.selectedjob = job;
 }
 
 // Gets Current User Profile Pic
 async getProfilePic() {
  var pic = await this.db.collection('profilePics').doc(this.user.uid).get().then(function(doc) {
     if (doc.exists) {
        console.log("Document data:", doc.data().filepath);
        return doc.data().filepath;
       } else {
         // doc.data() will be undefined in this case
        console.log("No such document!");
     }
   }).catch(function(error) {
     console.log("Error getting document:", error);
   }); 
   this.profilepic = pic;
   
  }
// Pass in uid and get profile pic for that uid
async getUIDProfilePic(uid) {
  var pic = await this.db.collection('profilePics').doc(uid).get().then(function(doc) {
     if (doc.exists) {
        console.log("Document data:", doc.data().filepath);
        return doc.data().filepath;
       } else {
         // doc.data() will be undefined in this case
        console.log("No such document!");
     }
   }).catch(function(error) {
     console.log("Error getting document:", error);
   }); 
   return pic;
   
}

async getUser() {

  var user = await this.db.collection('users').doc(this.user.uid).get().then(function(doc) {
     if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data();
       } else {
         // doc.data() will be undefined in this case
        console.log("No such document!");
     }
   }).catch(function(error) {
     console.log("Error getting document:", error);
   }); 
   this.currentuser = user;
   
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
  async addNewPostedJob() {
    var pic = await this.getUIDProfilePic(this.jobToPost.uid);
    var post = {"category":this.jobToPost.category, "location":this.jobToPost.location, "description":this.jobToPost.description, "pay":this.jobToPost.pay,
      "title": this.jobToPost.title, "uid": this.jobToPost.uid, "profilePic": pic, "pics": this.postPicsToUpload
    }
    

    this.db.collection('postedJobs').doc('jobs').set({
      postedJobs: firebase.firestore.FieldValue.arrayUnion(post)
    }, { merge: true });

    this.db.collection('users').doc(this.user.uid).get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        var db = firebase.firestore();
        var user = firebase.auth().currentUser;

        db.collection('users').doc(user.uid).set({
          email: doc.data().email,
          group: doc.data().group,
          jobsCompleted: doc.data().jobsCompleted,
          jobsCreated: doc.data().jobsCreated+1,
          moneyMade: doc.data().moneyMade,
          starRating: doc.data().starRating,
          username: doc.data().username,
          acceptedJobs: doc.data().acceptedJobs,
          postedJobs: firebase.firestore.FieldValue.arrayUnion(post)
         
      }, { merge: true });

        
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    }).catch(function(error) {
    console.log("Error getting document:", error);
    });
    this.jobToPost = undefined;
    this.postPicsToUpload = [];
  }

  async addNewCompletedJob() {
    var pic = await this.getUIDProfilePic(this.jobToPost.uid);
    var post = {"category":this.jobToPost.category, "description":this.jobToPost.description, "pay":this.jobToPost.pay,
      "title": this.jobToPost.title, "uid": this.jobToPost.uid, "profilePic": pic, "pics": this.postPicsToUpload
    }
    

    this.db.collection('postedJobs').doc('jobs').set({
      completedJobs: firebase.firestore.FieldValue.arrayUnion(post)
    }, { merge: true });

    this.db.collection('users').doc(this.user.uid).get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        var db = firebase.firestore();
        var user = firebase.auth().currentUser;

        db.collection('users').doc(user.uid).set({
          email: doc.data().email,
          group: doc.data().group,
          jobsCompleted: doc.data().jobsCompleted,
          jobsCreated: doc.data().jobsCreated+1,
          moneyMade: doc.data().moneyMade,
          starRating: doc.data().starRating,
          username: doc.data().username,
          acceptedJobs: doc.data().acceptedJobs,
          postedJobs: doc.data().postedJobs,
          completedJobs: firebase.firestore.FieldValue.arrayUnion(post)
         
      }, { merge: true });

        
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    }).catch(function(error) {
    console.log("Error getting document:", error);
    });
    this.jobToPost = undefined;
    this.postPicsToUpload = [];
  }

  addCompletedJob(job) {
    this.db.collection('users').doc(this.user.uid).get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        var db = firebase.firestore();
        var user = firebase.auth().currentUser;

        db.collection('users').doc(user.uid).set({
          email: doc.data().email,
          group: doc.data().group,
          jobsCompleted: doc.data().jobsCompleted,
          jobsCreated: doc.data().jobsCreated+1,
          moneyMade: doc.data().moneyMade,
          starRating: doc.data().starRating,
          username: doc.data().username,
          acceptedJobs: doc.data().acceptedJobs,
          completedJobs: firebase.firestore.FieldValue.arrayUnion(job)
         
      }, { merge: true });

     db.collection('completedJobs').doc('my-jobs').set({
        completedJobs: firebase.firestore.FieldValue.arrayUnion(job)
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

  addToCompletedJobs(post) {
    this.db.collection('completedJobs').doc('jobs').update({
      completedJobs: firebase.firestore.FieldValue.arrayUnion(post)
    });
    this.getCompletedJobs();
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

  async completeMyJob(job) {
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
    
      await this.db.collection('users').doc(this.user.uid).update({
        completedJobs: firebase.firestore.FieldValue.arrayUnion(job)
      });
    
      // Add job to completed jobs page
      this.addToCompletedJobs(job);
  
      // Refresh Pages
      this.getCompletedJobs();
      this.getMyJobs();
    }

  

}