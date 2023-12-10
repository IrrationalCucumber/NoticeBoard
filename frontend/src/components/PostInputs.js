import React from "react";

function PostInputs(props) {
  return (
    <div>
      <div>
        <input type="hidden" name="posterID" value={props.idValue} />
        <input
          type="text"
          placeholder="Enter a Title"
          name={props.title}
          value={props.titleValue}
          onChange={props.handleChange}
        />
        <label>Description</label>
        <textarea
          cols="20"
          rows="11"
          type="text"
          placeholder="Description"
          onChange={props.handleChange}
          name={props.desc}
          value={props.descValue}
        />
        <label>Date</label>
        <input
          type="date"
          placeholder="Date"
          onChange={props.handleChange}
          name={props.date}
          value={props.dateValue}
        />
        <input
          type="text"
          placeholder="Enter the Location"
          name={props.loc}
          value={props.locValue}
          onChange={props.handleChange}
        />
        <p>X: {props.long}</p>
        <p>Y: {props.lat}</p>
      </div>
      <div className="map--wrap">
        <div ref={props.mapContainer} className="map" />
      </div>
    </div>
  );
}

export default PostInputs;
