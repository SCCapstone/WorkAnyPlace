import firebase from 'firebase/app';
import 'firebase/firestore';

export function startConvo(user1Id, user2Id) {
    let db = firebase.firestore();
    let threadId;
    if (user1Id < user2Id) {
        threadId = user1Id.concat(user2Id.toString());
    } else {
        threadId = user2Id.concat(user1Id.toString());
    }
    let sentMessages = [{
        messageText: "Unit test!",
        receiverId: user1Id,
        senderId: user2Id,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date())
      }];
    db.collection("messages").doc(threadId).set({
        sentMessages: sentMessages
    });
}

export async function convoExists(user1Id, user2Id) {
    let db = firebase.firestore();
    let threadId;
    if (user1Id < user2Id) {
        threadId = user1Id.concat(user2Id.toString());
    } else {
        threadId = user2Id.concat(user1Id.toString());
    }
    let threadExists = await db.collection('messages').doc(threadId).get().then(function(doc) {
        if (doc.exists) {
            return true;
        } else {
            return false;
        }
    });
    db.collection('messages').doc(threadId).delete();
    return threadExists;
}