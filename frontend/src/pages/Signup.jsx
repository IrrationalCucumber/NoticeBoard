import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
function Signup() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    fname: "",
    lname: "",
    gender: "",
    email: "",
    bday: "",
    age: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  //save input data to account variablse
  const handleChange = (e) => {
    // For the 'gender' field, directly set the value without using spread syntax
    if (e.target.name === "gender") {
      setAccount((prev) => ({ ...prev, gender: e.target.value }));
    } else {
      // For other fields, use spread syntax as before
      setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
  //save inputted data to db
  const handleClick = async (e) => {
    //if fileds are empty
    //error message
    if (
      !account.username ||
      !account.password ||
      !account.email ||
      !account.fname ||
      !account.lname ||
      !account.age ||
      !account.bday ||
      !account.gender
    ) {
      setErrorMessage("Missing fields. Please try again.");
    }

    //save to db if no error
    e.preventDefault();
    try {
      await axios.post("https://localhost:8800/SignUp", account);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(account);
  return (
    <div className="body_su">
      <form className="form_su">
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="EMail"
          name="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="First name"
          name="fname"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Last name"
          name="lname"
          onChange={handleChange}
        />

        <select name="gender" onChange={handleChange} value={account.gender}>
          <option value="">Choose Sex....</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="date"
          placeholder="Birthday"
          name="bday"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Age"
          name="age"
          onChange={handleChange}
        />
        <h4>{errorMessage}</h4>
        <button onClick={handleClick}>Sign Up</button>
      </form>
      <h4>
        Already have an account? Sign-in <Link to="/">here!</Link>
      </h4>
    </div>
  );
}

export default Signup;
