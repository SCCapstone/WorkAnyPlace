// Tests for successful message convo deletion

import { startConvo, deleteConvo, convoExists } from "./deleteConvo";
import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../app/firebase';

fdescribe('deleteConvo', () => {
    fit('should add new convo to firebase messages collection', async function() {
        if (firebase.apps.length === 0) {
          firebase.initializeApp(firebaseConfig);
        }
        let db = firebase.firestore();
        let user1Id = 'TEST1';
        let user2Id = 'TEST2';
        startConvo(user1Id, user2Id);
        deleteConvo(user1Id, user2Id);
        expect(await convoExists(user1Id, user2Id)).toBe(false);
     });
 });