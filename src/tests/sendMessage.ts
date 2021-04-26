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
    let sentMessages = [];
    db.collection("messages").doc(threadId).set({
        sentMessages: sentMessages
    });
}

export function sendMessage(sendId, recId, msgText) {
    let db = firebase.firestore();
    let threadId;
    if (sendId < recId) {
        threadId = sendId.concat(recId.toString());
    } else {
        threadId = recId.concat(sendId.toString());
    }
    startConvo(sendId, recId);
    let collectionRef = db.collection("messages").doc(threadId);
    const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
    collectionRef.update({
      sentMessages: firebase.firestore.FieldValue.arrayUnion({
        messageText: msgText,
        receiverId: recId,
        senderId: sendId,
        timestamp: timestamp,
      })
    });
}

export async function messageSent(user1Id, user2Id) {
    let db = firebase.firestore();
    let threadId;
    if (user1Id < user2Id) {
        threadId = user1Id.concat(user2Id.toString());
    } else {
        threadId = user2Id.concat(user1Id.toString());
    }
    let thread = await db.collection('messages').doc(threadId).get().then(function(doc) {
        if (doc.exists) {
            return doc.data().sentMessages;
        } else {
            return null;
        }
    });
    if (thread != null && thread.length == 1) {
        return true;
    }
    else {
        return false;
    }
}