// Tests that a message can be sent between users

import { startConvo, sendMessage, messageSent } from "./sendMessage";
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

  fdescribe('sendMessage', () => {
    fit('should add new message to message thread', async function() {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
          }
        let db = firebase.firestore();
        let user1Id = 'TEST1';
        let user2Id = 'TEST2';
        let msgText = "Hello!";
        startConvo(user1Id, user2Id);
        sendMessage(user1Id, user2Id, msgText);
        expect(await messageSent(user1Id, user2Id)).toBe(true);
     });
 });