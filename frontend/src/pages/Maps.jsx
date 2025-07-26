import leaflet from 'leaflet';
import { useRef, useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { renderToString } from 'react-dom/server';

export default function GPSMapWithReactIcon() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = leaflet.map('map').setView([0, 0], 13);
      
      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(mapRef.current);
    }

    const createCustomIcon = () => {
      // Render the React icon to HTML string
      const iconString = renderToString(
        <div style={{ color: '#ff0000', fontSize: '24px' }}>
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
              .bindPopup("Your location");
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

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div id="map" style={{ height: '100%', width: '100%' }} />
    </div>
  );
}