import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //hndle event when button is click
  const handleClick = async (e) => {
    e.preventDefault();

    // Simple validation for empty username or password
    if (!username || !password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }
    axios
      .get(
        `https://localhost:8800/SignIn?username=${username}&password=${password}`
      )
      .then((response) => {
        if (response != null) {
          console.log(response.data);
          setUserID(response.data);
          console.log(userID);
          navigate(`/profile/${userID}`);
        } else {
          setError("Invalid Username/Password");
        }
      })
      .catch(function (error) {
        console.log(error);
        setErrorMessage("Invalid Username/Password");
      });
  };

  const handleChange = (e) => {
    setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div>
      <input
        type="username"
        placeholder="username"
        name="username"
        onChange={handleChange}
      />
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
