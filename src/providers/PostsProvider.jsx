import React, { useState, useEffect, createContext } from "react";
import { firestore } from "../firebase";
import { refactorData } from "../utilities";

export const PostsContext = createContext();

const postsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);  

  let unsubscribeFromFirestore = null;
  
  const fetchData = async () => {
    unsubscribeFromFirestore = await firestore
      .collection("posts")
      .onSnapshot(snapshot => {
        const posts = snapshot.docs.map(refactorData);
        // console.log(posts);
        setPosts(posts);
      });
  };

  useEffect(() => {
    fetchData();
    return () => {
      // stop listener for firestore
      unsubscribeFromFirestore();
    };
  }, []);

  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
};

export default postsProvider;
