import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

export interface Star {
  raterId: any;
  userId: any;
  value: number;
}

@Injectable()

export class StarService {

  constructor(private afs: AngularFirestore) { }

  getRaterStars(raterId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('raterId', '==', raterId) );
    return starsRef.valueChanges();
  }

  getUserStars(userId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('userId', '==', userId) );
    return starsRef.valueChanges();
  }

  setStar(raterId, userId, value) {
    // Star document data
    const star: Star = { raterId, userId, value };

    // Custom doc ID for relationship
    const starPath = `stars/${star.raterId}_${star.userId}`;

    // Set the data, return the promise
    return this.afs.doc(starPath).set(star)
  }
}
