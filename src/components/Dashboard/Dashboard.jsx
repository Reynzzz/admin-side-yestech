import Header from "../Header";
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { XMarkIcon } from "@heroicons/react/20/solid"; // Updated import
import Diagram from "./Barchart";

const Sidebar = ({ city, onClose }) => (
  <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-4 transform transition-transform duration-300 ${city ? 'translate-x-0' : 'translate-x-full'} z-50`}>
    <button onClick={onClose} className="text-right">
      <XMarkIcon className="w-6 h-6" color="black" />
    </button>
    {city && (
      <>
        <h2 className="text-xl font-bold mb-4">{city.name}</h2>
        <p>Coordinates: {city.coords.join(', ')}</p>
      </>
    )}
  </div>
);

export default function Dashboard() {
  const [selectedCity, setSelectedCity] = useState(null);

  const cities = [
    { name: 'Jakarta', coords: [-6.2088, 106.8456] },
    { name: 'Bandung', coords: [-6.9175, 107.6191] },
    { name: 'Yogyakarta', coords: [-7.7972, 110.3705] },
    { name: 'Surabaya', coords: [-7.2575, 112.7521] }
  ];

  const customIcon = new Icon({
    iconUrl: 'https://ik.imagekit.io/h8zb3jmn4/Group%201184.png?updatedAt=1718281652508',
    iconSize: [60, 70],
  });

  return (
    <div className="flex flex-col border w-full  lg:ml-11 ml-0 mt-20 lg:mt-0">
      <Header />
      <div className={`lg:p-4  bg-slate-100 h-full  ${selectedCity ? 'filter blur-sm' : ''}`}>
        <div className="grid grid-cols-4 mb-10 gap-5">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Total Page Views</div>
              <div className="stat-value">89,400</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Total Page Views</div>
              <div className="stat-value">89,400</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </div>
        </div>

        {/* <MapContainer center={[-2.5, 118]} zoom={5} style={{ height: '500px', width: '100%', zIndex: 0 }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {cities.map((city, index) => (
            <Marker
              key={index}
              position={city.coords}
              icon={customIcon}
              eventHandlers={{
                click: () => {
                  setSelectedCity(city);
                },
              }}
            >
              <Tooltip>{city.name}</Tooltip>
            </Marker>
          ))}
        </MapContainer> */}
        {/* <Diagram />  */}
      </div>
      <Sidebar city={selectedCity} onClose={() => setSelectedCity(null)} />
    </div>
  );
}
