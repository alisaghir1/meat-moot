"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { useMediaQuery } from "react-responsive";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { Icon } from "leaflet";

import "leaflet/dist/leaflet.css";

import { motion } from "framer-motion";
import { fadeIn } from "@/variants";

import dynamic from "next/dynamic";
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

// Dynamically import Icon from leaflet to avoid SSR issues
const Icon = dynamic(() => import("leaflet").then(mod => mod.Icon), { ssr: false });



const Branches = () => {
  const markers = [
    {
      position: [25.081737452270744, 55.13825487822296],
      title: "Dubai-Jbr",
      image: "/logo.png",
    },
    {
      position: [25.208183662819835, 55.26231124939097],
      title: "City walk",
      image: "/logo.png",
    },
    {
      position: [25.10124830083265, 55.24189563186607],
      title: "Dubai hills",
      image: "/logo.png",
    },
    {
      position: [25.234391172774007, 55.47382253826489],
      title: "Al khawaneej",
      image: "/logo.png",
    },
    {
      position: [24.403107833342087, 54.493050795909845],
      title: "Abu dhabi",
      image: "/logo.png",
    },
  ];

  const DynamicLeaflet = dynamic(() => import('react-leaflet'), {
    ssr: false,
  });

  const customIcon = new Icon({
    iconUrl: "/pin.svg",
    iconSize: [40, 40],
  });

  // This useEffect is because the map will reinitialize whenever you navigate between branches
  useEffect(() => {
    return () => {
      // Explicitly remove all map containers
      const mapContainers = document.querySelectorAll(".leaflet-container");
      mapContainers.forEach((container) => {
        if (container._leaflet_id) {
          container.remove(); // Clean up the map container
        }
      });
    };
  }, []);

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <motion.section 
    variants={fadeIn('up' , 1)}
    initial='hidden'
    whileInView={'show'}
    viewport={{once:false, amount:0.4}}
    id="branches">
      <div className="flex flex-col justify-center items-center mt-52 mb-10">
        <h2 className="text-orange text-center">Our Branches</h2>
        <p className="text-white text-center mx-10 mt-5">
          Discover the flavors of Meat Moot at our prime locations across Dubai
          and Abu Dhabi. Each branch offers a unique dining experience, blending
          exceptional service with our signature dishes. Find your nearest Meat
          Moot and indulge in a feast like no other.
        </p>
      </div>
      <MapContainer
        scrollWheelZoom={false}
        zoom={isMobile ? 7 : 9}
        zoomControl={false}
        center={[25.081737452270744, 55.13825487822296]}
        className={`${isMobile ? "h-[300px]" : " h-[800px]"} z-0`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">openStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {markers.map((marker, index) => {
          const googleMapsUrl = `https://www.google.com/maps?q=${marker.position[0]},${marker.position[1]}`;

          return (
            <Marker key={index} position={marker.position} icon={customIcon}>
              <Popup>
                <div className="flex gap-x-[30px]">
                  <div className="flex-1">
                    <h3>{marker.title}</h3>
                    <Link
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange w-full mt-2 inline-block"
                    >
                      Direction
                    </Link>
                  </div>
                  <div className="flex-auto">
                    <Image
                      src={marker.image}
                      width={130}
                      height={160}
                      alt={`image ${index}`}
                    />
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </motion.section>
  );
};

export default Branches;
