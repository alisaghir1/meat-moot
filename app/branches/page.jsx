"use client";
import React, { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import "ol/ol.css";
import { Map as OLMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Icon, Style } from "ol/style";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Select } from "ol/interaction";
import { click } from "ol/events/condition";
import Overlay from "ol/Overlay";
import MouseWheelZoom from "ol/interaction/MouseWheelZoom"; // Import MouseWheelZoom

const Branches = () => {
  const mapRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const markers = [
    {
      id: 1,
      position: [55.13825487822296, 25.081737452270744],
      title: "JBR",
    },
    {
      id: 2,
      position: [55.26231124939097, 25.208183662819835],
      title: "City Walk",
    },
    {
      id: 3,
      position: [55.24189563186607, 25.10124830083265],
      title: "Dubai Hills",
    },
    {
      id: 4,
      position: [55.47382253826489, 25.234391172774007],
      title: "Al Khawaneej",
    },
    {
      id: 5,
      position: [54.493050795909845, 24.403107833342087],
      title: "Abu Dhabi",
    },
  ];

  useEffect(() => {
    // Initialize OpenLayers map
    const map = new OLMap({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([55.13825487822296, 25.081737452270744]),
        zoom: isMobile ? 7 : 9,
      }),
      controls: [], // Disable zoom controls (plus and minus buttons)
    });

    // Disable scroll zoom (disable zooming on scroll)
    map.getInteractions().forEach((interaction) => {
      if (interaction instanceof MouseWheelZoom) {
        map.removeInteraction(interaction);
      }
    });

    // Create an overlay to display marker info when clicked
    const overlay = new Overlay({
      element: document.createElement("div"),
      positioning: "bottom-center",
      stopEvent: false,
    });
    map.addOverlay(overlay);

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    map.addLayer(vectorLayer);

    markers.forEach((marker) => {
      const markerFeature = new Feature({
        geometry: new Point(fromLonLat(marker.position)),
      });

      markerFeature.setStyle(
        new Style({
          image: new Icon({
            src: "/pin.svg",
            scale: 0.04,
          }),
        })
      );

      vectorSource.addFeature(markerFeature);

      markerFeature.set("title", marker.title);
      markerFeature.set("id", marker.id);
      markerFeature.set("position", marker.position);
    });

    // Create a select interaction to detect marker clicks
    const selectInteraction = new Select({
      condition: click,
    });
    map.addInteraction(selectInteraction);

    selectInteraction.on("select", (e) => {
      const selectedFeature = e.selected[0];

      if (selectedFeature) {
        const title = selectedFeature.get("title");
        const position = selectedFeature.get("position");

        // Set the active marker to show/hide the popup

        // Position the overlay on the clicked marker
        const coordinates = selectedFeature.getGeometry().getCoordinates();
        overlay.setPosition(coordinates);

        // Create content dynamically with the "Get Directions" link
        const overlayContent = document.createElement("div");
        overlayContent.className = "bg-white text-black p-3 shadow-md rounded-lg z-10";
        
        const titleElement = document.createElement("h3");
        titleElement.className = "font-bold";
        titleElement.textContent = title;

        const linkElement = document.createElement("a");
        linkElement.href = `https://www.google.com/maps?q=${position[1]},${position[0]}`;
        linkElement.target = "_blank";
        linkElement.rel = "noopener noreferrer";
        linkElement.className = "text-orange mt-2 inline-block";
        linkElement.textContent = "Get Directions";

        overlayContent.appendChild(titleElement);
        overlayContent.appendChild(linkElement);
        overlay.getElement().innerHTML = "";
        overlay.getElement().appendChild(overlayContent);
      } else {
        // If no feature is selected, reset active marker
      }
    });

    return () => {
      map.setTarget(undefined); // Clean up map on component unmount
    };
  }, [isMobile]);

  return (
    <motion.section
      variants={fadeIn("up", 1)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.4 }}
      id="branches"
    >
      <div className="flex flex-col justify-center items-center mt-52 mb-10">
        <h2 className="text-orange text-center">Our Branches</h2>
        <p className="text-white text-center mx-10 mt-5">
          Discover the flavors of Meat Moot at our prime locations across Dubai
          and Abu Dhabi. Each branch offers a unique dining experience, blending
          exceptional service with our signature dishes. Find your nearest Meat
          Moot and indulge in a feast like no other.
        </p>
      </div>

      <div
        ref={mapRef}
        style={{
          height: isMobile ? "300px" : "800px",
          width: "100%",
        }}
      ></div>
    </motion.section>
  );
};

export default Branches;
