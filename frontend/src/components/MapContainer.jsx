import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Map() {
  //carry id to other page
  const location = useLocation();
  const userID = location.pathname.split("/")[2]; //pathname to array from url
  //view post
  const navigate = useNavigate();
  const viewPost = (id) => {
    navigate(`/view/${userID}/${id}`);
  };
  //get all posted noitce
  const fetchNotices = async () => {
    try {
      const response = await fetch("https://localhost:8800/AllNotice");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
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
    // add markers for every notice
    fetchNotices().then((notices) => {
      notices.forEach((notice) => {
        const marker = new maplibregl.Marker({ color: "#FF0000" }) // Red marker for commissions
          .setLngLat([notice.long, notice.lat])
          .setPopup(
            new maplibregl.Popup().setHTML(
              `<h3>${notice.title}</h3><p>${notice.date}</p>`
            )
          )
          .addTo(map.current);
      });
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
    map.current.addControl(new maplibregl.GeolocateControl(), "top-right"); // button to get location
  }, [API_KEY, lat, lng, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
