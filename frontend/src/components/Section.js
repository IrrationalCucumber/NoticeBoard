import React from "react";
import { Button } from "./Button";
import "./Section.css";
import { useLocation } from "react-router-dom";

function Section() {
  //carry id to other page
  const location = useLocation();
  const userID = location.pathname.split("/")[2]; //pathname to array from url
  return (
    <div className="hero-container">
      <h1>NOTICE BOARD</h1>
      <p>See what Sempai can notice</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          page={`/notices/${userID}`}
        >
          SEE POSTS
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          page={`/map/${userID}`}
        >
          VIEW NEARBY POST
        </Button>
      </div>
    </div>
  );
}

export default Section;
