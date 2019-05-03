import React, { useState } from "react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const SignInAndSignUp = () => {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const handleSignIn = () => {
    setSignIn(!signIn);
    setSignUp(false);
  };

  const handleSignUp = () => {
    setSignUp(!signUp);
    setSignIn(false);
  };

  const handleBack = () => {
    setSignIn(false);
    setSignUp(false);
  };

  return (
    <div>
      <button onClick={handleSignIn}>SignIn</button>
      <button onClick={handleSignUp}>SignUp</button>
      {signIn ? <SignIn /> : null}
      {signUp ? <SignUp /> : null}
      {signIn === true || signUp === true ? (
        <button onClick={handleBack}>Back</button>
      ) : null}
    </div>
  );
};

export default SignInAndSignUp;
