// Tests for successful message convo deletion

import { startConvo, deleteConvo, convoExists } from "./deleteConvo";
import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAjkYhahTmDQGsQdpOh0wDffzm5aNSQ7PM",
    authDomain: "workanyplace-62a66.firebaseapp.com",
    databaseURL: "https://workanyplace-62a66.firebaseio.com",
    projectId: "workanyplace-62a66",
    storageBucket: "workanyplace-62a66.appspot.com",
    messagingSenderId: "882247469996",
    appId: "1:882247469996:web:ed4c8f7c2f104cfa55c809",
    measurementId: "G-B9ZCCZVQE9"
  };

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