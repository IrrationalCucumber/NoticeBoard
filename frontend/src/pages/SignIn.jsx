import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignIn() {
  const [account, setAccount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //hndle event when button is click
  const handleClick = () => {
    try {
      const res = axios.get("");
      if (res.data == null) {
        setErrorMessage = "Account does not exist";
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <input type="username" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <p>{errorMessage}</p>
      <button onClick={handleClick}>Sign In</button>
      <h4>
        Don't have an Account?Sign-up<Link to="/sign-up">here</Link>
      </h4>
    </div>
  );
}

export default SignIn;
