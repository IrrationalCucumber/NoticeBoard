import React from "react";

function ProfileInputs(props) {
  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Username"
          name={props.username}
          value={props.usernameValue}
          onChange={change}
        />
        <input
          type="password"
          placeholder="Username"
          name={props.password}
          value={props.passwordValue}
          onChange={change}
        />
        <input
          type="text"
          placeholder="First name"
          name={props.fname}
          value={props.fnameValue}
          onChange={change}
        />
        <input
          type="text"
          placeholder="Last name"
          name={props.lname}
          value={props.usernameValue}
          onChange={change}
        />

        <select name={props.sex} onChange={change} value={props.sexType}>
          <option value="">Choose type....</option>
          <option value="Male">Delivery Service</option>
          <option value="Female">Transport Service</option>
        </select>
        <input
          type="date"
          placeholder="Birthday"
          name={props.bday}
          value={props.bdayValue}
          onChange={change}
        />
        <input
          type="number"
          placeholder="Age"
          name={props.age}
          value={props.ageValue}
          onChange={change}
        />
      </form>
    </>
  );
}

export default ProfileInputs;
