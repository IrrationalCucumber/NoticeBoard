import React, { useRef, useEffect, useState } from "react";
import PostInputs from "../components/PostInputs";
import maplibregl from "maplibre-gl";
import axios from "axios";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

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
  const navigate = useNavigate();
  //carry id to other page
  const location = useLocation();
  const userID = location.pathname.split("/")[2]; //pathname to array from url
  const [name, setName] = useState({
    username: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  //store name no usestate
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
    }));
  }, notice);
  //variables for map
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(123.8854);
  const [lat] = useState(10.3157);
  const [zoom] = useState(10);
  const [API_KEY] = useState("ZQyqv6eWtI6zNE29SPDd");

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right"); //zoom in/out
    // map.current.addControl(new maplibregl.GeolocateControl(), "top-right"); // button to get location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLng = position.coords.longitude;
        const currentLat = position.coords.latitude;

        const marker = new maplibregl.Marker({
          color: "#00FF00",
          draggable: true,
        }) // Set draggable to true
          .setLngLat([currentLng, currentLat])
          .setPopup(new maplibregl.Popup().setHTML("<h3>Add location</h3>"))
          .addTo(map.current);

        setCurrentLocationMarker(marker);

        // Event listener for marker dragend event
        marker.on("dragend", () => {
          const newLngLat = marker.getLngLat();
          setNotice((prev) => ({
            ...prev,
            long: newLngLat.lng,
            lat: newLngLat.lat,
          }));
        });
      });
    }
  }, [API_KEY, zoom]);

  // Handle dragend event of the marker to update coordinates
  useEffect(() => {
    if (currentLocationMarker) {
      currentLocationMarker.on("dragend", () => {
        const newLngLat = currentLocationMarker.getLngLat();
        setNotice((prev) => ({
          ...prev,
          long: newLngLat.lng,
          lat: newLngLat.lat,
        }));
      });
    }
  }, [currentLocationMarker]);

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
      navigate(`/notices/${userID}`);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(notice);
  return (
    <div>
      <Navbar
        home={`/home/${userID}`}
        notices={`/notices/${userID}`}
        page2="NOTICES"
        page4={name.username}
        profile={`/profile/${userID}`}
        map={`/map/${userID}`}
      />
      <div className="input_body">
        <h1>POST A NOTICE FOR SENPAI UWU</h1>
        <PostInputs
          handleChange={handleChange}
          title="title"
          desc="description"
          date="date"
          loc="location"
          lat={parseFloat(notice.lat).toFixed(4)}
          long={parseFloat(notice.long).toFixed(4)}
          posterID="posterID"
          mapContainer={mapContainer}
        />
      </div>
      <h4>{errorMessage}</h4>

      <button className="add_notice" onClick={handleClick}>
        <b>POST</b>
      </button>
    </div>
  );
}

export default PostNotice;
