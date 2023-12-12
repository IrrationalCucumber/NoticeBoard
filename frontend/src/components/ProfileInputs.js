import { click } from "@testing-library/user-event/dist/click";
import React from "react";

function ProfileInputs(props) {
  return (
    <>
      <form className="prof_form">
        <div className="prof_in">
          <input
            type="text"
            placeholder="Username"
            name={props.username}
            value={props.usernameValue}
            onChange={props.change}
          />
        </div>
        <div className="prof_in">
          <input
            type="password"
            placeholder="Password"
            name={props.password}
            value={props.passwordValue}
            onChange={props.change}
          />
        </div>
        <div className="prof_in">
          <input
            type="text"
            placeholder="First name"
            name={props.fname}
            value={props.fnameValue}
            onChange={props.change}
          />
        </div>
        <div className="prof_in">
          <input
            type="text"
            placeholder="Last name"
            name={props.lname}
            value={props.lnameValue}
            onChange={props.change}
          />
        </div>
        <div className="prof_in">
          <input
            type="text"
            placeholder="Email address"
            name={props.email}
            value={props.emailValue}
            onChange={props.change}
          />
        </div>
        <div className="prof_in">
          <select
            name={props.sex}
            onChange={props.change}
            value={props.sexType}
          >
            <option value="">Choose type....</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="prof_in">
          <input
            type="date"
            placeholder="Birthday"
            name={props.bday}
            value={props.bdayValue}
            onChange={props.change}
          />
        </div>
        <div className="prof_in">
          <input
            type="number"
            placeholder="Age"
            name={props.age}
            value={props.ageValue}
            onChange={props.change}
          />
        </div>
        <h4 className="err_msg">{props.error}</h4>
        <div className="prof_button">
          <button onClick={click}>{props.buttonName}</button>
        </div>
      </form>
    </>
  );
}

export default ProfileInputs;
