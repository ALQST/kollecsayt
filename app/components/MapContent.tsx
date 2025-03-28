'use client';

import React from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../map-styles.css';
import L from 'leaflet';

const MapContent = () => {
  const position: [number, number] = [40.413188680100596, 49.960726648693964];

  return (
    <div style={{ height: '400px', width: '100%', position: 'relative' }}>
      <LeafletMap 
        center={position} 
        zoom={15} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=''
        />
        <Marker 
          position={position} 
          icon={L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })}
        >
          <Popup>
            Sosial-İqtisadi Kollec<br />
            Bakıxanov qəsəbəsi R.Qəmbərov 61
          </Popup>
        </Marker>
      </LeafletMap>
    </div>
  );
};

export default MapContent;