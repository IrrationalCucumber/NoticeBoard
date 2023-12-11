import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function NoticeList() {
  const [notices, setNotices] = useState([]);
  const [name, setName] = useState({
    username: "",
  });
  const [postID, setPostID] = useState("");

  //carry id to other page
  const location = useLocation();
  const userID = location.pathname.split("/")[2]; //pathname to array from url
  //store name no usestate
  useEffect(() => {
    const fetchName = async () => {
      axios
        .get(`http://localhost:5072/GetName?userID=${userID}`)
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

  //get all notices based on userid
  useEffect(() => {
    const fetchAllNotice = async () => {
      try {
        const response = await axios.get(
          `https://localhost:8800/NoticeList?posterID=${userID}`
        );
        console.log(response.data[0]);
        setNotices(response.data);
        //setPostID()
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllNotice();
  }, [userID]);
  const navigate = useNavigate();
  //function for viewing post
  const viewPost = () => {
    navigate(`/view/${userID}/${notices.id}`);
  };

  return (
    <div>
      <Navbar
        home={`/home/${userID}`}
        notices={`/notices/${userID}`}
        page2="NOTICES"
        page4={name.username.toUpperCase()}
        profile={`/profile/${userID}`}
      />
      <h1>Your 'Notice' to Senpai List</h1>

      {notices.map((Notice) => (
        <div key={Notice.id}>
          <h5>{Notice.id}</h5>
          <h3>{Notice.title}</h3>
          <p>{Notice.description}</p>
          <p>{new Date(Notice.date).toLocaleDateString()}</p>
          <p>{Notice.location}</p>
          <p>
            {Notice.long} {Notice.lat}
          </p>
          <button>
            <Link to={`/view/${userID}/${Notice.id}`}>VIEW</Link>
          </button>
        </div>
      ))}
    </div>
  );
}

export default NoticeList;
