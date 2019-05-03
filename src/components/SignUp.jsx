import React, { useState } from "react";
import { auth, createUserProfileDocument } from "../firebase";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    displayName: "ANONYMOUS",
    email: "",
    password: ""
  });

  // class SignUp extends Component {
  //   state = { displayName: "", email: "", password: "" };

  // handleChange = event => {
  //   const { name, value } = event.target;

  //   this.setState({ [name]: value });
  // };

  const handleSubmit = async event => {
    event.preventDefault();
    const { email, displayName, password } = inputs;

    try {
      // takes 2 arguments email and password
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      createUserProfileDocument(user, { displayName });
    } catch (err) {
      console.error(err);
    }

    setInputs({ displayName: "", email: "", password: "" });
  };

  // render() {
  //   const { displayName, email, password } = this.state;

  return (
    <form className="SignUp" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        name="displayName"
        placeholder="Display Name"
        value={inputs.displayName}
        onChange={event =>
          setInputs({ ...inputs, displayName: event.target.value })
        }
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={inputs.email}
        onChange={event => setInputs({ ...inputs, email: event.target.value })}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={inputs.password}
        onChange={event =>
          setInputs({ ...inputs, password: event.target.value })
        }
      />
      <input type="submit" value="Sign Up" />
    </form>
  );
};

export default SignUp;
