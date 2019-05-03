import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import "firebase/storage";

// Initialize Firebase
const config = {
  apiKey: "yourKey",
  authDomain: "yourDomain",
  databaseURL: "yourDBUrl",
  projectId: "yourPrjId",
  storageBucket: "yourStorageAddress",
  messagingSenderId: "yourMessangerId"
};

firebase.initializeApp(config);
// auth init
export const auth = firebase.auth();
// set up google auth provider for current app
export const provider = new firebase.auth.GoogleAuthProvider();
// set up signInWithGoogle function for current app
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const signOut = () => auth.signOut();
// firebase storage init
export const storage = firebase.storage();
// firestore database init
export const firestore = firebase.firestore();
// The timestampsInSnapshots setting now defaults to true and you no
// longer need to explicitly set it
// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;
  // reference to the place in database, where user profile might be.
  const userRef = firestore.doc(`users/${user.uid}`);
  // fetch document from that location
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    // console.log(additionalData);
    const { email, photoURL, displayName } = user;    
    const createdAt = new Date();
    try {
      await userRef.set({
        email,
        photoURL,
        displayName,
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.error("User Profile creation failed: ", err.message);
    }
  }

  return getUserProfileDocument(user.uid);
};

// return reference to the document in the db
export const getUserProfileDocument = async uid => {
  if (!uid) return null;
  try {
    return firestore.collection("users").doc(uid);
  } catch (err) {
    console.error("User document not found: ", err.message);
  }
};

// demonstartion purposes (dev tools)
window.firebase = firebase;
export default firebase;
