import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class JobsService {
  getPosts: any;

  constructor(public alertController: AlertController,) {
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
  selectedjob;
  selectedUser;
  profilepic = "../../assets/img/work_any_place_logo.png";
  currentuser;
  //////////////////////////////////////////////////////////////


  /* Retrieve from Firestore and uppdate variables *///////////////////////////////////////////////////////////
  async getPostedJobs() {
    var jobs = await this.db.collection('postedJobs').doc('jobs').get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data().postedJobs;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    this.posts = jobs;
    this.postsNew = jobs;
  }
  async getMyPostedJobs() {
    var jobs = await this.db.collection('users').doc(this.user.uid).get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data().postedJobs;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    this.myPostedJobs = jobs;
  }

  async getMyJobs() {
    var jobs = await this.db.collection('users').doc(this.user.uid).get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data().acceptedJobs);
        return doc.data().acceptedJobs;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    this.myjobs = jobs
  }

  async getCompletedJobs() {
    var jobs = await this.db.collection('completedJobs').doc('jobs').get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data().completedJobs;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    this.posts = jobs;
    this.completedJob = jobs;
  }
  async getMyCompletedJobs() {
    var jobs = await this.db.collection('users').doc(this.user.uid).get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data().completedJobs;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
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
    var pic = await this.db.collection('profilePics').doc(this.user.uid).get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data().filepath);
        return doc.data().filepath;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    this.profilepic = pic;

  }

  // Pass in uid and get profile pic for that uid
  async getUIDProfilePic(uid) {
    var pic = await this.db.collection('profilePics').doc(uid).get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data().filepath);
        return doc.data().filepath;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    return pic;

  }

  async getUser() {

    var user = await this.db.collection('users').doc(this.user.uid).get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    this.currentuser = user;

  }


  async getSelectedUser(uid) {

    var user = await this.db.collection('users').doc(uid).get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    this.selectedUser = user;
  }


  /*********************************************************************************************************/

  /* Push to Firestore *////////////////////////////////////////////////////////////////////////

  /* Add to users accepted Jobs */
  addAcceptedJob(post) {

    this.db.collection('users').doc(this.user.uid).get().then(function (doc) {
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
          starReceived: doc.data().starReceived,
          totalStars: doc.data().totalStars,
          username: doc.data().username,
          postedJobs: doc.data().postedJobs,
          acceptedJobs: firebase.firestore.FieldValue.arrayUnion(post),
          completedJobs: doc.data().completedJobs

        }, { merge: true });


      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }

  /* Use this function when adding a newly created Job */
  async addNewPostedJob() {
    var pic = await this.getUIDProfilePic(this.jobToPost.uid);
    var post = {
      "category": this.jobToPost.category, "location": this.jobToPost.location, "description": this.jobToPost.description, "pay": this.jobToPost.pay,
      "title": this.jobToPost.title, "uid": this.jobToPost.uid, "profilePic": pic, "pics": this.postPicsToUpload
    }


    this.db.collection('postedJobs').doc('jobs').set({
      postedJobs: firebase.firestore.FieldValue.arrayUnion(post)
    }, { merge: true });

    this.db.collection('users').doc(this.user.uid).get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        var db = firebase.firestore();
        var user = firebase.auth().currentUser;

        db.collection('users').doc(user.uid).set({
          email: doc.data().email,
          group: doc.data().group,
          jobsCompleted: doc.data().jobsCompleted,
          jobsCreated: doc.data().jobsCreated + 1,
          moneyMade: doc.data().moneyMade,
          starRating: doc.data().starRating,
          starReceived: doc.data().starReceived,
          totalStars: doc.data().totalStars,
          username: doc.data().username,
          acceptedJobs: doc.data().acceptedJobs,
          postedJobs: firebase.firestore.FieldValue.arrayUnion(post),
          completedJobs: doc.data().completedJobs

        }, { merge: true });


      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });


    await this.db.collection('pendingCompletion').doc(this.user.uid+this.jobToPost.title).set({
      confirm: false,
      attempt: false,
    })

    this.db.collection("pendingCompletion").doc(this.user.uid+this.jobToPost.title)
    .onSnapshot((doc) => {
      if(doc.data().attempt == true) {
        alert("A job was just completed check your messages to confirm or decline.");
      } else {
        
      }
    });

    this.jobToPost = undefined;
    this.postPicsToUpload = [];
  }

  async addNewCompletedJob() {
    var pic = await this.getUIDProfilePic(this.jobToPost.uid);
    var post = {
      "category": this.jobToPost.category, "description": this.jobToPost.description, "pay": this.jobToPost.pay,
      "title": this.jobToPost.title, "uid": this.jobToPost.uid, "profilePic": pic, "pics": this.postPicsToUpload
    }


    this.db.collection('postedJobs').doc('jobs').set({
      completedJobs: firebase.firestore.FieldValue.arrayUnion(post)
    }, { merge: true });

    this.db.collection('users').doc(this.user.uid).get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        var db = firebase.firestore();
        var user = firebase.auth().currentUser;

        db.collection('users').doc(user.uid).set({
          email: doc.data().email,
          group: doc.data().group,
          jobsCompleted: doc.data().jobsCompleted,
          jobsCreated: doc.data().jobsCreated + 1,
          moneyMade: doc.data().moneyMade,
          starRating: doc.data().starRating,
          starReceived: doc.data().starReceived,
          totalStars: doc.data().totalStars,
          username: doc.data().username,
          acceptedJobs: doc.data().acceptedJobs,
          postedJobs: doc.data().postedJobs,
          completedJobs: firebase.firestore.FieldValue.arrayUnion(post)

        }, { merge: true });


      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    this.jobToPost = undefined;
    this.postPicsToUpload = [];
  }

  addCompletedJob(job) {
    this.db.collection('users').doc(this.user.uid).get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        var db = firebase.firestore();
        var user = firebase.auth().currentUser;

        db.collection('users').doc(user.uid).set({
          email: doc.data().email,
          group: doc.data().group,
          jobsCompleted: doc.data().jobsCompleted,
          jobsCreated: doc.data().jobsCreated + 1,
          moneyMade: doc.data().moneyMade,
          starRating: doc.data().starRating,
          starReceived: doc.data().starReceived,
          totalStars: doc.data().totalStars,
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
    }).catch(function (error) {
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

  async pushRating(stars, uid) {
   
    var newStarRating  = await this.db.collection("users").doc(uid).get().then(function (doc) {
      if (doc.exists) {
        var totalstars = doc.data().totalStars;
        var starsreceived = doc.data().starReceived+1;
        var newStarRating = (totalstars+stars)/starsreceived;
        console.log("Stars Rating: "+starsreceived);
        return newStarRating;
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    
    this.db.collection("users").doc(uid).update({
      starRating: newStarRating,
      starReceived: this.selectedUser.starReceived + 1,
      totalStars: this.selectedUser.totalStars +stars
    })
      .then(() => {
        console.log("Document successfully updated!");
        this.getUser();
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

  async rateUser(uid) {
    const alert = await this.alertController.create({
      header: 'Please rate the user out of 5',
      inputs: [
        {
          name: '1',
          type: 'radio',
          label: '1',
          value: '1',
          handler: () => {
            
          },
          checked: true,
        },
        {
          name: '2',
          type: 'radio',
          label: '2',
          value: '2',
          handler: () => {
            
          }
        },
        {
          name: '3',
          type: 'radio',
          label: '3',
          value: '3',
          handler: () => {
            console.log('Radio 3 selected');
          }
        },
        {
          name: '4',
          type: 'radio',
          label: '4',
          value: '4',
          handler: () => {
            
          }
        },
        {
          name: '5',
          type: 'radio',
          label: '5',
          value: '5',
          handler: () => {
            
          }
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          cssClass: "alertButtons",
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          cssClass: "alertButtons",
          handler: data => {
            var starsNum = parseInt(data,10);
            this.pushRating(starsNum, uid);
          }
        }
      ]
    });
    await alert.present();
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


    //Add to pendingCompletion and set a listener to it and see 
   

    // this.db.collection("pendingCompletion").doc(job.uid+job.title)
    // .onSnapshot((doc) => {
    //     if(doc.data().confirm == true) {
    //       alert("It has been confirmed");
    //     }
    // });
     
    // Removes Job from Firestore from users acceptedJobs array  
    await this.db.collection('users').doc(this.user.uid).update({
      acceptedJobs: firebase.firestore.FieldValue.arrayRemove(job)
    });

    //Add to users completed jobs
    await this.db.collection('users').doc(this.user.uid).update({
      completedJobs: firebase.firestore.FieldValue.arrayUnion(job)
    });

    // Add job to completed jobs page adds to completed jobs in fire store
    // ***** Need to fix what this does
    this.addToCompletedJobs(job);

    // Refresh Pages
    this.getCompletedJobs();
    this.getMyJobs();
  }





}