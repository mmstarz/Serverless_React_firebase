import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import withUser from './withUser';
import Post from "./Post";
import Comments from "./Comments";
import { firestore } from "../firebase";
import { refactorData } from "../utilities";

const postPage = ({ match, user }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const {
    params: { id }
  } = match;
  
  // const { uid, displayName } = auth.currentUser;

  const postRef = firestore.doc(`posts/${id}`);
  const commentsRef = postRef.collection("comments");

  let unsubscribeFromPost = null;
  let unsubscribeFromComments = null;

  const fetchPost = async () => {
    unsubscribeFromPost = await postRef.onSnapshot(snapshot => {
      const updatedPost = refactorData(snapshot);
      setPost(updatedPost);
    });

    unsubscribeFromComments = await commentsRef.onSnapshot(snapshot => {
      const updatedComments = snapshot.docs.map(doc => refactorData(doc));
      setComments(updatedComments);
    });
  };

  useEffect(() => {
    fetchPost();

    return () => {
      unsubscribeFromPost();
      unsubscribeFromComments();
    };
  }, []);

  // console.log(post);
  // console.log(comments);
  const createComment = comment => {
    commentsRef.add({
      ...comment,
      user,
      createdAt: new Date()
    });
    // console.log(comment);
  };

  // console.log(user);

  return (
    <section className='PostPage'>
      {post && <Post {...post} />}
      <Comments comments={comments} postId={id} onCreate={createComment} user={user} />
    </section>
  );
};

// withUser((postPage)) - means compose all functions
export default withRouter(withUser((postPage)));
