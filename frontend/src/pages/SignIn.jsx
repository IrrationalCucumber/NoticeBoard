import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { useAuth } from "../components/AuthContext"; // Import useAuth

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userID, setUserID] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from useAuth

  //hndle event when button is click
  const handleClick = async (e) => {
    e.preventDefault();

    // Simple validation for empty username or password
    if (!username || !password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }
    try {
      const response = await axios.get(
        `https://localhost:8800/SignIn?username=${username}&password=${password}`
      );

      if (response != null) {
        //console.log(response.data);

        // Use the useEffect hook to handle the state update asynchronously
        setUserID(response.data);
        login();
        navigate(`/home/${response.data}`);
      } else {
        setErrorMessage("Invalid Username/Password");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Invalid Username/Password");
    }
  };

  useEffect(() => {
    // This useEffect will be triggered when userID changes
    // console.log(userID);
  }, [userID]);

  return (
    <div className="si_cont">
      <form action="" className="form_si">
        <div className="si_banner">
          <h1>WELCOME</h1>
          <p>Sign in now to now what's up</p>
        </div>
        <div className="si_input">
          <input
            className="si_in"
            type="username"
            placeholder="Username..."
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="si_input">
          <input
            className="si_in"
            type="password"
            placeholder="Password...."
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="si_error">
          <p className="error">{errorMessage}</p>
        </div>
        <div className="si_button">
          <button className="si_but" onClick={handleClick}>
            <b>SIGN IN</b>
          </button>
        </div>
        <h5 className="su_link">
          <i>
            Don't have an Account? Sign-up <Link to="/sign-up">here!</Link>
          </i>
        </h5>
      </form>
    </div>
  );
}

export default SignIn;
