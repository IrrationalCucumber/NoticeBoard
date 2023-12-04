import React, { useState } from "react";
import ProfileInputs from "../components/ProfileInputs";

function Profile() {
  const [name, setName] = useState("");
  const [account, setAccount] = useState({
    username: "",
    password: "",
    fname: "",
    lname: "",
    sex: "",
    bday: "",
    age: "",
  });
  //get name
  useEffect(() => {
    const fetchName = async () => {
      axios
        .get("http://localhost:8800/username", userID) // endpoint
        .then((response) => {
          setName(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchName();
  }, []);

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

  //save changes
  const saveChanges = () => {
    if (
      account.username == null ||
      account.age == null ||
      account.bday == null ||
      account.fname == null ||
      account.lname == null
    ) {
      alert("Missing fields!");
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
      <button onClick={saveChanges}>SAVE</button>
    </div>
  );
}

export default Profile;
