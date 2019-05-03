import React from "react";
import Posts from "./Posts";
import Authtentication from "./Authentication";
import { Switch, Route, Link } from "react-router-dom";
import UserProfile from "./UserProfile";
import PostPage from './PostPage';

const app = () => {

  const router = (
    <Switch>
      <Route path="/profile" component={UserProfile} />
      <Route path="/posts/:id" component={PostPage} />
      <Route exact path="/" component={Posts} />
    </Switch>
  );

  return (
    <main className="Application">
      <Link to='/'><h1>Think Piece</h1></Link>
      <Authtentication />
      {router}
    </main>
  );
};

export default app;
