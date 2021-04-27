// Tests that a message can be sent between users

import { startConvo, sendMessage, messageSent } from "./sendMessage";
import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../app/firebase';

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