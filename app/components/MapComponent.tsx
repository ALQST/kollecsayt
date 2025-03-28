'use client';

import { useRef, useEffect, useState } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../map-styles.css';
import L from 'leaflet';

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
      if (mapContainer.current) {
        const map = mapContainer.current.querySelector('.leaflet-container');
        if (map) {
          map.innerHTML = '';
        }
      }
    };
  }, []);

  const position: [number, number] = [40.413188680100596, 49.960726648693964];

  // Create a custom icon using the mynaui MapPin SVG
  const customIcon = L.divIcon({
    className: 'custom-map-marker',
    html: `<div style="color: #1f487a; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 7 11.5 7.3 11.8.4.4 1 .4 1.4 0 .3-.3 7.3-6.4 7.3-11.8 0-4.4-3.6-8-8-8zm0 10.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 7.5 12 7.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/>
            </svg>
          </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });

  return (
    <div 
      id="map-container" 
      ref={mapContainer} 
      style={{ 
        width: '100%', 
        height: '100%',
        minHeight: '200px',
        borderRadius: 'md',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        zIndex: 1,
        isolation: 'isolate'
      }}
    >
      {isMounted && (
        <LeafletMap 
          center={position} 
          zoom={15} 
          style={{ 
            width: '100%', 
            height: '100%', 
            position: 'absolute', 
            top: 0, 
            left: 0,
            zIndex: 1,
            borderRadius: 'md'
          }}
        >
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
          />
          <Marker 
            position={position}
            icon={customIcon}
          >
            <Popup>
              Sosial-İqtisadi Kollec<br />
              Bakıxanov qəsəbəsi R.Qəmbərov 61
            </Popup>
          </Marker>
        </LeafletMap>
      )}
    </div>
  );
};

export default MapComponent;