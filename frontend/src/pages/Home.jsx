import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
//import axios from "axios";

function Home() {
  //carry id to other page
  const location = useLocation();
  const userID = location.pathname.split("/")[2]; //pathname to array from url

  return (
    <div>
      <Navbar
      //faction={`/faction/${userID}`}
      //page3={faction}
      //page4={name}
      //profile={`/profile/${userID}`}
      />
      Home
    </div>
  );
}

export default Home;
