import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function NoticeList() {
  const [noitces, setNotices] = useState([]);
  //carry id to other page
  const location = useLocation();
  const userID = location.pathname.split("/")[2]; //pathname to array from url

  //get all notices based on userid
  useEffect(() => {
    const fetchAllNotice = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/commission/${userID}`
        );
        console.log(res.data);
        setNotices(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllNotice();
  }, []);

  return (
    <div>
      <h1>Your 'Notice' to Senpai List</h1>
      {noitces.map((Notice) => (
        <div key={Notice.postID}>
          <p>{Notice.Title}</p>
          <p>{Notice.Description}</p>
          <p>{new Date(Notice.Date).toLocaleDateString()}</p>
          <p>{Notice.Loc}</p>
        </div>
      ))}
    </div>
  );
}

export default NoticeList;
