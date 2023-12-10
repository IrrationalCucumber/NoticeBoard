import React, { useRef, useEffect, useState } from "react";
import PostInputs from "../components/PostInputs";
import maplibregl from "maplibre-gl";
import axios from "axios";
import "./style.css";
import { useLocation } from "react-router-dom";

function PostNotice() {
  const [notice, setNotice] = useState({
    posterID: "",
    title: "",
    description: "",
    location: "",
    long: "",
    lat: "",
    date: "",
  });
  //carry id to other page
  const location = useLocation();
  const userID = location.pathname.split("/")[2]; //pathname to array from url

  const [errorMessage, setErrorMessage] = useState("");

  //marker objects
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
  // Add a state to track the marker's longitude and latitude
  const [markerLngLat, setMarkerLngLat] = useState([123.8854, 10.3157]); // Default values

  const handleChange = (e) => {
    setNotice((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    setNotice((prev) => ({
      ...prev,
      posterID: userID,
      long: 1,
      lat: 1,
    }));
  }, notice);
  //variables for map
  //   const mapContainer = useRef(null);
  //   const map = useRef(null);
  //   const [API_KEY] = useState("ZQyqv6eWtI6zNE29SPDd");
  //   const [zoom] = useState(10);

  //   useEffect(() => {
  //     if (map.current) return;

  //     map.current = new maplibregl.Map({
  //       container: mapContainer.current,
  //       style: `https://api.maptiler.com/maps/streets-v2/style.json?key=ZQyqv6eWtI6zNE29SPDd`,
  //       center: markerLngLat,
  //       zoom: zoom,
  //     });

  //     map.current.addControl(new maplibregl.NavigationControl(), "top-right");

  //     if ("geolocation" in navigator) {
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         const currentLng = position.coords.longitude;
  //         const currentLat = position.coords.latitude;

  //         const marker = new maplibregl.Marker({
  //           color: "#00FF00",
  //           draggable: true,
  //         }) // Set draggable to true
  //           .setLngLat([currentLng, currentLat])
  //           .setPopup(new maplibregl.Popup().setHTML("<h3>Add location</h3>"))
  //           .addTo(map.current);

  //         setCurrentLocationMarker(marker);

  //         // Event listener for marker dragend event
  //         marker.on("dragend", () => {
  //           const newLngLat = marker.getLngLat();
  //           setNotice((prev) => ({
  //             ...prev,
  //             long: newLngLat.lng,
  //             lat: newLngLat.lat,
  //           }));
  //         });
  //       });
  //     }
  //   }, [API_KEY, zoom]);

  //   // Handle dragend event of the marker to update coordinates
  //   useEffect(() => {
  //     if (currentLocationMarker) {
  //       currentLocationMarker.on("dragend", () => {
  //         const newLngLat = currentLocationMarker.getLngLat();
  //         setNotice((prev) => ({
  //           ...prev,
  //           long: newLngLat.lng,
  //           lat: newLngLat.lat,
  //         }));
  //       });
  //     }
  //   }, [currentLocationMarker]);'

  //save to db
  const handleClick = async (e) => {
    //if fileds are empty
    //error message
    if (
      !notice.title ||
      !notice.description ||
      !notice.location ||
      !notice.date
    ) {
      setErrorMessage("Missing fields. Please try again.");
    }

    //save to db if no error
    e.preventDefault();
    try {
      await axios.post("https://localhost:8800/Post", notice);
      alert("Post successful");
      //navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(notice);
  return (
    <div>
      <div>
        <h1>POST A NOTICE FOR SENPAI UWU</h1>
        <PostInputs
          handleChange={handleChange}
          title="title"
          desc="description"
          date="date"
          loc="location"
          lat={notice.lat}
          long={notice.long}
          posterID="posterID"
          //mapContainer={mapContainer}
        />
      </div>
      <button onClick={handleClick}>POST</button>
    </div>
  );
}

export default PostNotice;
