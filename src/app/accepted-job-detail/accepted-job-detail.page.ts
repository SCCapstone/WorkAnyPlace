import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { MessageService } from '../message.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-accepted-job-detail',
  templateUrl: './accepted-job-detail.page.html',
  styleUrls: ['./accepted-job-detail.page.scss'],
})
export class AcceptedJobDetailPage implements OnInit {

  constructor(public jobsService:JobsService,
    public alertController: AlertController,
    public messageService:MessageService, 
    public router: Router) { }

  
  defaultimg = '../assets/img/work_any_place_logo.png' 

  db = firebase.firestore();
  user = firebase.auth().currentUser;

  starRating;

  async ngOnInit() {
    await this.getSelectedUser();
  }
  refresh() {
    this.getAcceptedJobs();
    this.jobsService.getPostedJobs();
    this.jobsService.getMyCompletedJobs();
  }
  getAcceptedJobs() {
    this.jobsService.getMyJobs()
  }


  async cancelJob() {
    await this.jobsService.cancelMyJob(this.jobsService.selectedjob)
    this.jobsService.getPostedJobs()
    this.refresh()
  
    let posterId = this.jobsService.selectedjob.uid;
    this.messageService.removeConvo(this.user.uid, posterId);

    this.router.navigate(['/my-jobs']);
    this.router.navigate(['/tabs']);
    
   }

   async completeJob() {
    await this.db.collection('pendingCompletion').doc(this.jobsService.selectedjob.uid+this.jobsService.selectedjob.title).set({
      confirm: false,
      attempt: true,
    })

  //   await this.jobsService.completeMyJob(this.jobsService.selectedjob)
  //  //this.jobsService.getCompletedJobs()
  //   this.refresh()
    
    let posterId = this.jobsService.selectedjob.uid;
    //this.messageService.removeConvo(this.user.uid, posterId);
  
    let threadId;
    if (posterId < this.user.uid) {
      threadId = posterId.concat(this.user.uid.toString());
    } else {
      threadId = this.user.uid.concat(posterId.toString());
    }

    let sentMessage = {
      messageText: "Job has been completed. Can you confirm? Send confirm to close job or decline request.",
      receiverId: posterId,
      senderId: this.user.uid,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date())
    };

    this.db.collection('messages').doc(threadId).update({
      sentMessages: firebase.firestore.FieldValue.arrayUnion(sentMessage)
    });

   

    this.db.collection("messages").doc(threadId)
    .onSnapshot((doc) => {
      var sentMessages = doc.data().sentMessages;
      var lastIndex;
      this.db.collection('messages').doc(threadId).get().then(function(doc) {
        lastIndex = doc.data().sentMessages.length-1
      });
      
      if(sentMessages[lastIndex].senderId == posterId) {
        if(sentMessages[lastIndex].messageText == "Confirm" || sentMessages[lastIndex].messageText == "confirm") {
          alert("Confirmed!");
          this.hasBeenConfirmed();
        } else {
          alert("Not confirmed");     
      }
      } else {
       
      }
    });
  
    this.router.navigate(['/my-jobs']);
    this.router.navigate(['/tabs']);

   }

   async hasBeenConfirmed() {
    await this.jobsService.completeMyJob(this.jobsService.selectedjob)
    //this.jobsService.getCompletedJobs()
     this.refresh()

    let posterId = this.jobsService.selectedjob.uid;
    this.messageService.removeConvo(this.user.uid, posterId);
  
    var ref = this.db.collection("users").doc(this.user.uid);
  
    this.router.navigate(['/my-jobs']);
    this.router.navigate(['/tabs']);

    return ref.update({ 
       jobsCompleted: this.jobsService.currentuser.jobsCompleted+1,
       moneyMade: this.jobsService.currentuser.moneyMade+this.jobsService.selectedjob.pay,
       hoursWorked: this.jobsService.currentuser.hoursWorked+2
    })
    .then(() => {
        console.log("Document successfully updated!");
        this.jobsService.getUser();
    })
    .catch((error) => {
      // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
   }
  
  
   completeJobConfirm() {
    this.alertController.create({
      header: 'Did you complete this job?',
      subHeader: 'Thank you for completing this job',
      message: 'Job will be removed from your jobs and the owner will be notified',
      buttons: [  
        {
          text: 'Yes',
          cssClass: "alertButtons",
          handler: () => {
            this.completeJob()
            
          }
        },
        {
          text: 'No',
          cssClass: "alertButtons",
          handler: () => {
            
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
   
   removeJobConfirm() {
    this.alertController.create({
      header: 'Are  you sure?',
      subHeader: 'Are you sure you want to cancel job?',
      message: 'Job will be removed from your jobs and the owner will be notified',
      buttons: [  
        {
          text: 'Yes',
          cssClass: "alertButtons",
          handler: () => {
            this.cancelJob()
          }
        },
        {
          text: 'No',
          cssClass: "alertButtons",
          handler: () => {
            
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  getSelectedUser() {
    this.jobsService.getSelectedUser(this.jobsService.selectedjob.uid);
    this.starRating = this.jobsService.selectedUser.starRating;
    this.starRating = this.starRating.toFixed(1);
  }

}
