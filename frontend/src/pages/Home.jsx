import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

function Home() {
  const [name, setName] = useState({
    username: "",
  });
  //carry id to other page
  const location = useLocation();
  const userID = location.pathname.split("/")[2]; //pathname to array from url
  useEffect(() => {
    const fetchName = async () => {
      axios
        .get(`https://localhost:8800/GetName?userId=${userID}`)
        .then((response) => {
          //console.log(response.data);
          setName({
            username: response.data,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchName();
  }, [userID]);
  //console.log(name.username);
  return (
    <div>
      <Navbar
        //faction={`/faction/${userID}`}
        //page3={faction}
        page4={name.username}
        // profile={`/profile/${userID}`}
      />
      Home
    </div>
  );
}

export default Home;
