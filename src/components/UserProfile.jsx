import React, { useState } from "react";
import { auth, firestore, storage } from "../firebase";

const userProfile = () => {
  const [userSettings, setUserSettings] = useState({
    displayName: ""
  });

  let imageInput = null;

  // function uid() {
  //   return auth.currentUser.uid;
  // }

  // function userRef() {
  //   return firestore.doc(`users/${uid}`);
  // }  
  const handleSubmit = event => {
    event.preventDefault();
    const { displayName } = userSettings;
    const uid = auth.currentUser.uid;

    if (displayName.length > 0) {
      firestore.doc(`users/${uid}`).update({ displayName });
    }

    const file = imageInput.files[0];

    if (file) {
      console.log(file);
      storage
        .ref()
        .child("user-profiles")
        .child(uid)
        .child(file.name)
        .put(file)
        .then(response => {
          return response.ref.getDownloadURL();
        })
        .then(url => {
          // console.log(url);
          firestore.doc(`users/${uid}`).update({ photoURL: url })
        })
        .catch(err => {
          return console.error(err);
        });
    }

    setUserSettings({ displayName: "" });
  };

  return (
    <section className="UserProfile">
      <p>User profile settings</p>
      <form onSubmit={event => handleSubmit(event)}>
        <input
          name="diplayName"
          value={userSettings.displayName}
          placeholder="username"
          onChange={event =>
            setUserSettings({
              ...userSettings,
              displayName: event.target.value
            })
          }
        />
        <input type="file" ref={ref => (imageInput = ref)} />
        <input className="update" type="submit" />
      </form>
    </section>
  );
};

export default userProfile;
