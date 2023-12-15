import React, { useEffect, useState } from "react";
import MapContainer from "../components/MapContainer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Map() {
  //carry id to other page
  const location = useLocation();
  const userID = location.pathname.split("/")[2]; //pathname to array from url
  //get name
  const [name, setName] = useState({
    username: "",
  });
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
  return (
    <div>
      <Navbar
        home={`/home/${userID}`}
        notices={`/notices/${userID}`}
        map={`/map/${userID}`}
        page2="NOTICES"
        page4={name.username}
        profile={`/profile/${userID}`}
      />

      <MapContainer />
    </div>
  );
}

export default Map;
