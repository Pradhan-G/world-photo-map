import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Leaflet icon fix
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
    position: [26.792143, 82.200549], // Ayodhya
    name: 'Ayodhya Trip',
    photos: [
      '/photos/Ayodhya.png'
    ]
  },
  {
    id: 2,
    position: [43.774185, 11.258248], // Florence
    name: 'Florence Adventure',
    photos: [
      '/photos/Florence.png'
    ]
  },
  {
    id: 3,
    position: [37.983519, 23.727638], //Athens
    name: 'Athens Trip',
    photos: [
      "/photos/Athens.png"
    ]
  },
  {
    id: 4,
    position: [46.204117, 6.143323], //Geneva
    name: 'Geneva Trip',
    photos: [
      "/photos/Geneva.png"
    ]
  },
  {
    id: 5,
    position: [15.474315, 74.007024], //Goa
    name: 'Goa Trip',
    photos: [
      "/photos/Goa.png"
    ]
  },
  {
    id: 6,
    position: [8.090767, 98.902335], //Krabi
    name: 'Krabi Trip',
    photos: [
      "/photos/Krabi.png"
    ]
  },
  {
    id: 7,
    position: [46.539680, 7.877101], //Lauterbrunen
    name: 'LauterBrunen Trip',
    photos: [
      "/photos/lauterbrunen.png"
    ]
  },
  {
    id: 8,
    position: [26.835496, 80.942853], //Lucknow
    name: 'Lucknow Trip',
    photos: [
      "/photos/Lucknow.png"
    ]
  },
  {
    id: 9,
    position: [3.202758, 73.220685], //Maldives
    name: 'Maldives Trip',
    photos: [
      "/photos/Maldives.png"
    ]
  },
  {
    id: 10,
    position: [37.444486, 25.326171], //Mykonos
    name: 'Mykonos Trip',
    photos: [
      "/photos/Mykonos.png"
    ]
  },
  {
    id: 11,
    position: [46.772042, 8.437929], //Mt Titlis
    name: 'Mt Titlis Trip',
    photos: [
      "/photos/Mt. Titlis.png"
    ]
  },
  {
    id: 12,
    position: [8.550529, 77.397016], //Noida
    name: 'Noida Trip',
    photos: [
      "/photos/Noida.png"
    ]
  },
  {
    id: 13,
    position: [7.882881, 98.391625], //Phuket
    name: 'Phuket Trip',
    photos: [
      "/photos/Phuket.png"
    ]
  },
  {
    id: 14,
    position: [41.882864, 12.500283], //Rome
    name: 'Rome Trip',
    photos: [
      "/photos/Rome.png"
    ]
  },
  {
    id: 15,
    position: [36.390269, 25.459080], //Santorini
    name: 'Santorini Trip',
    photos: [
      "/photos/Santorini.png"
    ]
  },
  {
    id: 16,
    position: [45.439115, 12.316993], //Venice
    name: 'Venice Trip',
    photos: [
      "/photos/Venice.png"
    ]
  },
  {
    id: 17,
    position: [45.976424, 7.658237], //Zermatt Matterhorn
    name: 'Zermatt Matterhorn Trip',
    photos: [
      "/photos/Zermatt Matterhorn.png"
    ]
  },
  {
    id: 18,
    position: [47.373692, 8.539823], //Zurich
    name: 'Zurich Trip',
    photos: [
      "/photos/Zurich.png"
    ]
  },
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let intervalId;
    if (imageModalOpen && selectedLocation) {
      intervalId = setInterval(() => {
        setCurrentPhotoIndex((prevIndex) => 
          (prevIndex + 1) % selectedLocation.photos.length
        );
      }, 3000); // Change photo every 3 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [imageModalOpen, selectedLocation]);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    setCurrentPhotoIndex(0);
    setImageModalOpen(true);
  };

  const closeModal = () => {
    setImageModalOpen(false);
  };

  const LoaderScreen = () => (
    <div style={{position: 'fixed',top: 0,left: 0,width: '100%',height: '100%',backgroundColor: '#f0f0f0',display: 'flex',flexDirection: 'column',justifyContent: 'start',alignItems: 'center',zIndex: 9999, color:"white"
    }}>
      <div style={{
        textAlign: 'center',
        padding: '20px',
        borderRadius: '10px',
        background: "none",
        width:"100vw",
        display: 'flex',
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
      }}>
        <div style={{backgroundColor:"none", display:'flex', flexDirection: 'column', alignContent: 'center', alignItems:  'center' }}>
        <img src='/photos/Front.JPG' 
        style={{
          height: "120%",
          width: "100%",
          position: 'absolute',
          zIndex: "-2",
          top:"0",
          left: "0"
        }}
        />
        <h1 style={{
          marginTop:"-20px",
          fontSize: '3rem',
          color: 'black',

        }}>
          Happy Us Day ❤️
        </h1>
        <p style={{
          marginTop:"-20px",
          fontSize: '2rem',
          color: 'black',

        }}>
          Here's to seeing the world together
        </p>
        <p style={{
          marginTop:"-20px",
          fontSize: '2rem',
          color: 'black',
          marginBottom: ""
        }}>
          for the rest of our lives
        </p>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid black',
          borderTop: '4px solid white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        </div>
        
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  if (isLoading) {
    return <LoaderScreen />;
  }

  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden' 
    }}>
      <MapContainer 
        center={[0, 0]} 
        zoom={3} 
        style={{ 
          width: '100%', 
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
        zoomControl={false}
        attributionControl={false}
        maxZoom={100}
        minZoom={2}
        dragging={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locationData.map((location) => (
          <Marker 
            key={location.id}
            position={location.position}
            eventHandlers={{
              click: () => handleMarkerClick(location)
            }}
          />
        ))}
      </MapContainer>

      {imageModalOpen && selectedLocation && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={closeModal}
        >
          <div 
            style={{
              position: 'relative',
              maxWidth: '90%',
              maxHeight: '80vh',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedLocation.photos[currentPhotoIndex]} 
              alt={`${selectedLocation.name} - Photo ${currentPhotoIndex + 1}`}
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxWidth: '90%', 
                maxHeight: '80vh',
                objectFit: 'contain',
                boxShadow: '0 0 20px rgba(255,255,255,0.5)',
                animation: 'fadeIn 0.5s ease-in-out'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              justifyContent: 'center',
              width: '100%'
            }}>
              {selectedLocation.photos.map((_, index) => (
                <div 
                  key={index}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: index === currentPhotoIndex ? 'white' : 'rgba(255,255,255,0.5)',
                    margin: '0 5px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setCurrentPhotoIndex(index)}
                />
              ))}
            </div>
            <button 
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                backgroundColor: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}

export default App;
