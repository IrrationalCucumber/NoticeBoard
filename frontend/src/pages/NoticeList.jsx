import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import PostCardItem from "../components/PostCardItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NoticeList() {
  const [notices, setNotices] = useState([]);
  const [name, setName] = useState({
    username: "",
  });
  const navigate = useNavigate();
  //carry id to other page
  const location = useLocation();
  const userID = location.pathname.split("/")[2]; //pathname to array from url
  //check if online
  //if not, use saved icon
  const [online, setOnline] = useState(true); // Assume online by default
  const checkConnection = async () => {
    try {
      await fetch("https://www.google.com", { mode: "no-cors" });
      setOnline(true);
    } catch (error) {
      setOnline(false);
    }
  };
  useEffect(() => {
    checkConnection();
  }, []);

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

  const viewPost = (id) => {
    navigate(`/view/${userID}/${id}`);
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

      <div className="post-cont">
        <h1>Your 'Notice' to Senpai List</h1>
        <div className="posts">
          <div className="post_wrap">
            {notices.map((Notice) => (
              <div className="post" key={Notice.id}>
                <ul className="post_items">
                  <PostCardItem
                    id={Notice.id}
                    title={Notice.title}
                    desc={Notice.description}
                    date={new Date(Notice.date).toLocaleDateString()}
                    loc={Notice.location}
                    long={Notice.long}
                    toPost={(e) => viewPost(Notice.id)}
                    delete={(e) => handleDelete(Notice.id)}
                  />
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="add_post">
          <button
            className="add_post"
            onClick={(e) => navigate(`/post/${userID}`)}
          >
            {online ? <i className="fa-solid fa-add fa-beat"></i> : <>ADD</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoticeList;
