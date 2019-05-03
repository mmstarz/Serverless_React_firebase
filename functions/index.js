const functions = require("firebase-functions");
const admin = require("firebase-admin");

// init firebase keys
admin.initializeApp(functions.config().firebase);

// init firestore
const firestore = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.getAllPosts = functions
  .region("europe-west1")
  .https.onRequest(async (req, res) => {
    // get snashot from db
    const snapshot = await firestore.collection("posts").get();
    // refactor data
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // send response in json
    res.json({ posts });
  });

// onWrite() - listens for doc changes
exports.sanitizeContent = functions
  .region("europe-west1")
  .firestore.document("posts/{postId}")
  .onWrite(async change => {
    // if deletion happend return
    if (!change.before.exists) return;
    // otherwise get content
    const { content, sanitized } = change.after.data();
    // if there is a new content
    if (content && !sanitized) {
      // update
      return change.after.ref.update({
        content: content.replace(/CoffeeScript/g, "**********"),
        sanitized: true
      });
    }
    // if there is no new content
    return null;
  });

exports.incrementCommentCount = functions
  .region("europe-west1")
  .firestore.document("posts/{postId}/comments/{commentId}")
  .onCreate(async (snapshot, context) => {
    const { postId } = context.params;
    const postRef = firestore.doc(`posts/${postId}`);
    const snap = await postRef.get("comments");
    const comments = snap.get('comments');
    return postRef.update({ comments: comments + 1 });
  });
