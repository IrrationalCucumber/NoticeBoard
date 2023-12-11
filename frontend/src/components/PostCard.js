import React from "react";
import { Link } from "react-router-dom";

function PostCard(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.desc}</p>
      <p>{props.date}</p>
      <h5>{props.loc}</h5>
      <p>
        {props.long} {props.lat}
      </p>
      <button onClick={props.click}>{props.button}</button>
      <button onClick={props.del}>{props.delete}</button>
    </div>
  );
}

export default PostCard;
