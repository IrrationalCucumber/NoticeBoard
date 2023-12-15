import React, { useEffect, useRef, useState } from "react";
import PostInputs from "../components/PostInputs";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import maplibregl from "maplibre-gl";
import axios from "axios";

function UpdatePost() {
  const [notice, setNotice] = useState({
    posterID: "",
    title: "",
    description: "",
    location: "",
    long: "",
    lat: "",
    date: "",
  });
  const [name, setName] = useState({
    username: "",
  });

  //handle change
  const handleChange = (e) => {
    setNotice((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //carry id to other page
  const location = useLocation();
  const userID = location.pathname.split("/")[2]; //pathname to array from url
  const postID = location.pathname.split("/")[3];
  //getName of user
  useEffect(() => {
    const fetchNotice = async () => {
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
    fetchNotice();
  }, [userID]);
  //get post details
  useEffect(() => {
    const fetchNotice = async () => {
      axios
        .get(`https://localhost:8800/ViewPost?postID=${postID}`)
        .then((response) => {
          //if (response != null) console.log(response.data);
          // const retrievedAccount = response.data[0];
          //format date
          console.log(response.data);
          const formattedDate = new Date(response.data.date)
            .toISOString()
            .substr(0, 10);
          setNotice({
            posterID: response.data.posterID,
            title: response.data.title,
            description: response.data.description,
            location: response.data.location,
            long: response.data.long,
            lat: response.data.lat,
            date: formattedDate,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    fetchNotice();
  }, [userID]);
  //get the coordinates
  const fetchLoc = async () => {
    try {
      const response = await fetch(
        `https://localhost:8800/ViewPost?postID=${postID}`
      );
      const data = await response.json();

      if (Array.isArray(data)) {
        return data;
      } else if (typeof data === "object") {
        // If it's a single object, convert it to an array
        return [data];
      } else {
        console.error("Data is not an array or object:", data);
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  //marker objects
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
  // Add a state to track the marker's longitude and latitude
  const [markerLngLat, setMarkerLngLat] = useState([123.8854, 10.3157]); // Default values
  //variables for map
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(123.8854);
  const [lat] = useState(10.3157);
  const [zoom] = useState(10);
  const [API_KEY] = useState("ZQyqv6eWtI6zNE29SPDd");
  //initialize map
  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right"); //zoom in/out
    map.current.addControl(new maplibregl.GeolocateControl(), "top-right"); // button to get location

    fetchLoc().then((notice) => {
      notice.forEach((notice) => {
        const currentLng = notice.long;
        const currentLat = notice.lat;
        const marker = new maplibregl.Marker({
          color: "#FF0000",
          draggable: true,
        }) // Red marker for commissions
          .setLngLat([currentLng, currentLat])
          .setPopup(
            new maplibregl.Popup().setHTML(
              `<h3>${notice.title}</h3><p>${notice.description}</p><h4>{}</h4>`
            )
          )
          .addTo(map.current);

        setCurrentLocationMarker(marker);
      });
    });
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

  const navigate = useNavigate();
  const handleUpdate = async () => {
    if (
      !notice.title ||
      !notice.description ||
      !notice.location ||
      !notice.date
    ) {
      setErrorMessage("Missing fields!");
      return;
    }

    try {
      const response = await axios.post(
        `https://localhost:8800/UpdateNotice?postID=${postID}`,
        notice
        // Send data as the 'data' property
      );

      //Check the response from the server
      if (response.data === "SUCCESS") {
        navigate(`/view/${userID}/${postID}`);
      } else {
        console.error("Update failed:", response.data);
      }
    } catch (err) {
      console.error("Error updating Notice:", err);
    }
  };
  return (
    <div>
      <Navbar
        home={`/home/${userID}`}
        notices={`/notices/${userID}`}
        page2="NOTICES"
        page4={name.username}
        profile={`/profile/${userID}`}
      />
      <div className="input_body">
        <PostInputs
          handleChange={handleChange}
          title="title"
          desc="description"
          date="date"
          loc="location"
          lat={parseFloat(notice.lat).toFixed(4)}
          long={parseFloat(notice.long).toFixed(4)}
          posterID="posterID"
          titleValue={notice.title}
          descValue={notice.description}
          dateValue={notice.date}
          locValue={notice.location}
          mapContainer={mapContainer}
        />
      </div>

      <button className="add_notice" onClick={handleUpdate}>
        <b>UPDATE</b>
      </button>
    </div>
  );
}

export default UpdatePost;
