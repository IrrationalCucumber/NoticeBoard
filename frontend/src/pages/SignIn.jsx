import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignIn() {
  const [account, setAccount] = useState("");
  return (
    <div>
      <input type="username" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <p>{errorMessage}</p>
      <button>Sign In</button>
      <h4>
        Don't have an Account?Sign-up<Link to="/sign-up">here</Link>
      </h4>
    </div>
  );
}

export default SignIn;
