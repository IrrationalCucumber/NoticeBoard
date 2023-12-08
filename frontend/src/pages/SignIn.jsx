import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userID, setUserID] = useState("");
  const navigate = useNavigate();

  //hndle event when button is click
  const handleClick = async (e) => {
    e.preventDefault();

    //   // Simple validation for empty username or password
    //   if (!username || !password) {
    //     setErrorMessage("Please enter both username and password.");
    //     return;
    //   }
    //   axios
    //     .get(
    //       `https://localhost:8800/SignIn?username=${username}&password=${password}`
    //     )
    //     .then((response) => {
    //       if (response != null) {
    //         //console.log(response.data);
    //         //setUserID(response.data);
    //         //console.log(userID);
    //         navigate(`/profile/${userID}`);
    //       } else {
    //         setErrorMessage("Invalid Username/Password");
    //       }
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //       setErrorMessage("Invalid Username/Password");
    //     });
  };

  return (
    <div>
      <input
        type="username"
        placeholder="username"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <p>{errorMessage}</p>
      <button onClick={handleClick}>Sign In</button>
      <h4>
        Don't have an Account?Sign-up<Link to="/sign-up">here</Link>
      </h4>
    </div>
  );
}

export default SignIn;
