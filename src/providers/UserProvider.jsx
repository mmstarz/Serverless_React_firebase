import React, { useState, useEffect, createContext } from "react";
import { auth, createUserProfileDocument } from "../firebase";
// context with default value
export const UserContext = createContext({ user: null });

const usersProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  let unsubscribeFromAuth = null;

  const fetchUser = async () => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        // document reference
        const userRef = await createUserProfileDocument(userAuth);
        // every time document changes
        userRef.onSnapshot(snapshot => {
          // console.log(snapshot);
          setUser({ uid: snapshot.id, ...snapshot.data() });
        });
      }
      setUser(userAuth);
    });
  };

  useEffect(() => {
    fetchUser();

    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  // console.log(user);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default usersProvider;
