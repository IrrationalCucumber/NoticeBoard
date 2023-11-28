import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const [name, setName] = useState("");
  const [faction, setFaction] = useState("");
  //carry id to other page
  const location = useLocation();
  const userID = location.pathname.split("/")[2];
  //pathname to array from
  return (
    <div>
      <Navbar
        home="/"
        faction={`/faction/${userID}`}
        page3={faction}
        profile={name}
        page4={`/profile/${userID}`}
      />
      Home
    </div>
  );
}

export default Home;
