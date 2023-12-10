import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userID, setUserID] = useState("");
  const navigate = useNavigate();

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
        console.log(response.data);

        // Use the useEffect hook to handle the state update asynchronously
        setUserID(response.data);
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
    console.log(userID);
  }, [userID]);
  // await axios
  //   .get(
  //     `https://localhost:8800/SignIn?username=${username}&password=${password}`
  //   )
  //   .then((response) => {
  //     if (response != null) {
  //       console.log(response.data);
  //       setUserID(response.data);
  //       //console.log(userID);
  //       //navigate(`/home/${userID}`);
  //     } else {
  //       setErrorMessage("Invalid Username/Password");
  //     }
  //     console.log(userID);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     setErrorMessage("Invalid Username/Password");
  //   });
  //  };

  return (
    <div>
      <form action="" className="form_si">
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
        <p className="error">{errorMessage}</p>
        <button onClick={handleClick}>Sign In</button>
        <h4>
          Don't have an Account?Sign-up <Link to="/sign-up">here!</Link>
        </h4>
      </form>
    </div>
  );
}

export default SignIn;
