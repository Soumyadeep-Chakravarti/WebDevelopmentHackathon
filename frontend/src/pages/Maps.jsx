import leaflet from 'leaflet';
import { useRef, useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { renderToString } from 'react-dom/server';

export default function GPSMapWithReactIcon() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [position, setPosition] = useState(null); // This was missing
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = leaflet.map('map').setView([0, 0], 13);
      
      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(mapRef.current);
    }

    const createCustomIcon = () => {
      const iconString = renderToString(
        <div className="text-red-500 text-2xl">
          <FaMapMarkerAlt />
        </div>
      );
      
      return leaflet.divIcon({
        html: iconString,
        className: 'custom-marker-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 24]
      });
    };

    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const newPos = [latitude, longitude];
          setPosition(newPos); // This updates the position state

          mapRef.current.setView(newPos, 13);
          
          if (markerRef.current) {
            markerRef.current.setLatLng(newPos);
          } else {
            markerRef.current = leaflet.marker(newPos, {
              icon: createCustomIcon()
            }).addTo(mapRef.current)
              .bindPopup("Your current location");
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Add geocoding implementation here
  };

  return (
    <div className="relative h-screen w-full">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-[1000] max-w-md mx-auto">
        <form onSubmit={handleSearch} className="flex shadow-lg rounded-full overflow-hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search location..."
            className="flex-grow p-2 pl-4 focus:outline-none bg-gray-100 text-gray-800 placeholder-gray-500 text-sm"
          />
          <button 
            type="submit" 
            className="bg-gray-300 text-gray-700 p-2 px-4 hover:bg-gray-400 transition-colors"
          >
            <FaSearch className="text-gray-600" />
          </button>
        </form>
      </div>

      <div id="map" className="h-full w-full" />
      
      {/* Only show position display if position exists */}
      {position && (
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md z-[1000]">
          <p>Latitude: {position[0].toFixed(5)}</p>
          <p>Longitude: {position[1].toFixed(5)}</p>
        </div>
      )}
    </div>
  );
}