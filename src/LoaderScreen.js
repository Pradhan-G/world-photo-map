import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default Leaflet marker icon
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const locationData = [
  {
    id: 1,
    position: [40.7128, -74.0060], // New York
    name: 'New York Trip',
    photos: [
      'https://picsum.photos/400/300?random=1',
      'https://picsum.photos/400/300?random=2',
      'https://picsum.photos/400/300?random=3'
    ]
  },
  {
    id: 2,
    position: [48.8566, 2.3522], // Paris
    name: 'Paris Adventure',
    photos: [
      'https://picsum.photos/400/300?random=4',
      'https://picsum.photos/400/300?random=5',
      'https://picsum.photos/400/300?random=6'
    ]
  }
];

function Loader() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading screen

    return () => clearTimeout(timer);
  }, []);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    setCurrentPhotoIndex(0);
    setImageModalOpen(true);
  };

  const nextPhoto = () => {
    if (selectedLocation && selectedLocation.photos) {
      setCurrentPhotoIndex((prevIndex) => 
        (prevIndex + 1) % selectedLocation.photos.length
      );
    }
  };

  const prevPhoto = () => {
    if (selectedLocation && selectedLocation.photos) {
      setCurrentPhotoIndex((prevIndex) => 
        prevIndex === 0 ? selectedLocation.photos.length - 1 : prevIndex - 1
      );
    }
  };

  const closeModal = () => {
    setImageModalOpen(false);
  };

  // Loader Screen Component
  const LoaderScreen = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#f0f0f0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      animation: 'fadeInOut 3s ease-in-out'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '20px',
        borderRadius: '10px',
        background: 'white',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          fontSize: '3rem',
          color: '#333',
          marginBottom: '20px',
          animation: 'bounce 1s infinite'
        }}>
          Happy Anniversary!
        </h1>
        <p style={{
          fontSize: '1.5rem',
          color: '#666',
          marginBottom: '30px'
        }}>
          Here are your memorable trips
        </p>
        <div style={{
          width: '100px',
          height: '100px',
          border: '4px solid #333',
          borderTop: '4px solid #ff6b6b',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
      <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  // Rest of the previous component remains the same...
  return (
    <>
      {isLoading ? <LoaderScreen /> : (
        <div style={{ 
          position: 'relative', 
          width: '100vw', 
          height: '100vh', 
          overflow: 'hidden' 
        }}>
          {/* Previous MapContainer and image modal code */}
          <MapContainer 
            center={[0, 0]} 
            zoom={2} 
            style={{ 
              width: '100%', 
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0
            }}
            zoomControl={false}
            attributionControl={false}
            maxZoom={3}
            minZoom={2}
            dragging={false}
          >
            {/* Previous MapContainer content */}
          </MapContainer>

          {/* Previous image modal code */}
        </div>
      )}
    </>
  );
}

export default Loader;