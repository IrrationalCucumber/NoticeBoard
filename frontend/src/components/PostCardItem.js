import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PostCardItem(props) {
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

  return (
    <>
      <li className="li_wrap">
        <div className="post_item" onClick={props.toPost}>
          <h2>#{props.id}</h2>
          <div className="post_info">
            <h3>{props.title}</h3>
          </div>
          <div className="post_info">
            <p>{props.desc}</p>
          </div>
          <div className="post_info">
            <h5>{props.date}</h5>
          </div>
          <div className="post_info">
            <h4>{props.loc}</h4>
          </div>
        </div>

        <buton className="post_button" onClick={props.delete}>
          {online ? <i className="fa-solid fa-trash-can"></i> : <>DELETE</>}
        </buton>
      </li>
    </>
  );
}

export default PostCardItem;
