import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";

function NoticeList() {
  const [notices, setNotices] = useState([]);
  const [name, setName] = useState({
    username: "",
  });
  const navigate = useNavigate();

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
        //console.log(response.data[0]);
        setNotices(response.data);
        //setPostID()
      } catch (error) {
        console.log("Its Empty");
      }
    };

    fetchAllNotice();
  }, [userID]);

  const handleDelete = async (id) => {
    try {
      await axios.post(`https://localhost:8800/DeletePost?postId=${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
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
          <button onClick={(e) => navigate(`/view/${userID}/${Notice.id}`)}>
            VIEW
          </button>
          <button onClick={() => handleDelete(Notice.id)}>DELETE</button>
          <PostCard
            title={Notice.title}
            desc={Notice.description}
            date={new Date(Notice.date).toLocaleTimeString()}
            loc={Notice.location}
            long={Notice.long}
            lat={Notice.lat}
            click={(e) => navigate(`/view/${userID}/${Notice.id}`)}
            button="VIEW"
            del={(e) => handleDelete(Notice.id)}
            delete="DELETE"
          />
        </div>
      ))}
      <button onClick={(e) => navigate(`/post/${userID}`)}>
        ADD NEW NOTICE
      </button>
    </div>
  );
}

export default NoticeList;
