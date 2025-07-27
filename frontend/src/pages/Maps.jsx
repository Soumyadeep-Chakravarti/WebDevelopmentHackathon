import leaflet from 'leaflet';
import { useRef, useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt, FaSearch, FaSpinner } from 'react-icons/fa';
import { renderToString } from 'react-dom/server';

export default function GPSMapWithReactIcon() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [position, setPosition] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

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
          setPosition(newPos); 

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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setSearchError(null);
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      if (data.length === 0) {
        throw new Error('Location not found');
      }
      
      // Take the first result
      const result = data[0];
      const newPos = [parseFloat(result.lat), parseFloat(result.lon)];
      
      setPosition(newPos);
      mapRef.current.setView(newPos, 13);
      
      if (markerRef.current) {
        markerRef.current.setLatLng(newPos);
      } else {
        markerRef.current = leaflet.marker(newPos, {
          icon: createCustomIcon()
        }).addTo(mapRef.current);
      }
      
      markerRef.current
        .setPopupContent(`Searched location: ${result.display_name || searchQuery}`)
        .openPopup();
      
    } catch (error) {
      console.error('Search error:', error);
      setSearchError(error.message);
    } finally {
      setIsSearching(false);
    }
  };

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

  return (
    <div className="relative h-screen w-full">
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
            className="bg-gray-300 text-gray-700 p-2 px-4 hover:bg-gray-400 transition-colors flex items-center justify-center"
            disabled={isSearching}
          >
            {isSearching ? (
              <FaSpinner className="text-gray-600 animate-spin" />
            ) : (
              <FaSearch className="text-gray-600" />
            )}
          </button>
        </form>
        {searchError && (
          <div className="mt-2 p-2 bg-red-100 text-red-700 text-sm rounded">
            {searchError}
          </div>
        )}
      </div>

      <div id="map" className="h-full w-full" />
      {position && (
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md z-[1000]">
          <p>Latitude: {position[0].toFixed(5)}</p>
          <p>Longitude: {position[1].toFixed(5)}</p>
        </div>
      )}
    </div>
  );
}