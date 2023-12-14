import React from "react";

function PostInputs(props) {
  return (
    <div className="post_in_wrap">
      <div className="post_in_cont">
        <div className="rowan">
          <input type="hidden" name="posterID" value={props.idValue} />
          <div className="col1">
            <label>
              <h4>Title</h4>
            </label>
          </div>
          <div className="col2">
            <input
              type="text"
              placeholder="Enter a Title"
              name={props.title}
              value={props.titleValue}
              onChange={props.handleChange}
            />
          </div>

          <div className="col1">
            <label>
              <h4>Description</h4>
            </label>
          </div>
          <div className="col2">
            <textarea
              cols="20"
              rows="11"
              type="text"
              placeholder="Description"
              onChange={props.handleChange}
              name={props.desc}
              value={props.descValue}
            />
          </div>
          <div className="col1">
            <label>
              <h4>Date</h4>
            </label>
          </div>
          <div className="col2">
            <input
              type="date"
              placeholder="Date"
              onChange={props.handleChange}
              name={props.date}
              value={props.dateValue}
            />
          </div>
          <div className="col1">
            <label>
              <h4>Location</h4>
            </label>
          </div>
          <div className="col2">
            <input
              type="text"
              placeholder="Enter the Location"
              name={props.loc}
              value={props.locValue}
              onChange={props.handleChange}
            />
          </div>
          <div className="col1">
            <p>X: {props.long}</p>
          </div>
          <div className="col2">
            <p>Y: {props.lat}</p>
          </div>
        </div>
      </div>
      <div className="map--wrap--post">
        <div ref={props.mapContainer} className="map_small" />
      </div>
    </div>
  );
}

export default PostInputs;
