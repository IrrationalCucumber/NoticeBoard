import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const [name, setName] = useState("");
  const [faction, setFaction] = useState("");
  //carry id to other page
  const location = useLocation();
  const userID = location.pathname.split("/")[2]; //pathname to array from url

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
  //get faction
  useEffect(() => {
    const fetchFaction = async () => {
      try {
        const res = await axios.get("http://localhost:8800/user", userID);
        //"http://localhost:8800/commission" - local computer
        //"http://192.168.1.47:8800/commission" - netwrok
        setFaction(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFaction();
  }, []);

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
