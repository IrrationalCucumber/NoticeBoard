import React, { useState } from "react";

function Signup() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    fname: "",
    lname: "",
    sex: "",
    bday: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  //save input data to account variablse
  const handleChange = () => {};

  //save inputted data to db
  const handleClick = () => {
    if (
      account.username == null ||
      account.password == null ||
      fname == null ||
      lname == null ||
      sex == null ||
      bday == null
    ) {
      setErrorMessage = "Please fill all fields";
    }
  };
  return (
    <div>
      <form>
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
          type="password"
          placeholder="Password"
          name="password2"
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

        <select name="sex" onChange={handleChange} value={account.sex}>
          <option value="">Choose type....</option>
          <option value="Male">Delivery Service</option>
          <option value="Female">Transport Service</option>
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
        <button onClick={handleClick}>Sign Up</button>
      </form>
      <h4>
        Already have an account? Sign-in <Link to="/signin">here!</Link>
      </h4>
    </div>
  );
}

export default Signup;
