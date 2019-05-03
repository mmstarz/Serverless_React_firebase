import React from "react";
import Comment from "./Comment";
import AddComment from "./AddComment";

const Comments = ({ comments, onCreate, user }) => {
  return (
    <section className="Comments">
      {user && <AddComment onCreate={onCreate} />}
      {comments.map(comment => (
        <Comment {...comment} key={comment.id} />
      ))}
    </section>
  );
};

export default Comments;
