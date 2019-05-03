# Firebase && React

### QuerySnapshots

<!-- SLIDES -->

A `QuerySnapshot` has the following properties:

- `docs`: All of the documents in the snapshot.
- `empty`: This is a boolean that lets us know if the snapshot was empty.
- `metadata`:  Metadata about this snapshot, concerning its source and if it has local modifications.
  - Example: `SnapshotMetadata {hasPendingWrites: false, fromCache: false}`
- `query`: A reference to the query that you fired.
- `size`: The number of documents in the `QuerySnapshot`.

…and the following methods:

- `docChanges()`: An array of the changes since the last snapshot.
- `forEach()`: Iterates over the entire array of snapshots.
- `isEqual()`: Let's you know if it matches another snapshot.

`QuerySnapshots` typically hold onto a number `QueryDocumentSnapshot`s, which inherit from `DocumentSnapshot` and have the following properties:

- `id`: The `id` of the given document.
- `exists`: Is this even a thing in the database?
- `metadata`: Pretty much the same as `QuerySnapshot` above.
- `ref`: A reference to the the documents location in the database.

…and the following methods:

- `data()`: Gets all of the fields of the object.
- `get()`: Allows you to access a particular property on the object.
- `isEqual()`: Useful for comparisons.

References allow you to access the database itself. This is useful for getting the collection that document is from, deleting the document, listening for changes, setting and updating properties.

You can get a bit more granular if you'd like:

- `read`
  - `get`
  - `list`
- `write`
  - `create`
  - `update`
  - `delete`

You can nest rules to sub-collections:

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      match /comments/{comment} {
        allow read, write: if <condition>;
      }
    }
  }
}
```

If you want to go to an arbitrary depth, then you can do `{document=**}`.

**Important**: If multiple rules match, then the operation is allowed if _any_ of them are true.
