import React, { useState } from "react";
import ProfileInputs from "../components/ProfileInputs";

function Profile() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    fname: "",
    lname: "",
    sex: "",
    bday: "",
    age: "",
  });
  //save data to account
  const handleChange = (e) => {
    // For the 'gender' field, directly set the value without using spread syntax
    if (e.target.name === "gender") {
      setAccount((prev) => ({ ...prev, sex: e.target.value }));
    } else {
      // For other fields, use spread syntax as before
      setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
  return (
    <div>
      <ProfileInputs
        change={handleChange}
        username="username"
        password="password"
        fname="fname"
        lname="lname"
        sex="sex"
        sexType={account.sex}
        date="bday"
        age="age"
      />
    </div>
  );
}

export default Profile;
