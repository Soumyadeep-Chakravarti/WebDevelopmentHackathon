import leaflet from 'leaflet'
import { useRef, useEffect } from 'react'
import 'leaflet/dist/leaflet.css' // Import Leaflet CSS

export default function Maps() {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Check if map already exists
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = leaflet.map(mapContainerRef.current).setView([51.505, -0.09], 13);
      
      leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(mapRef.current);
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={mapContainerRef}
      style={{ height: '100vh', width: '100%' }} // Must set dimensions
      id="map"
    />
  );
}