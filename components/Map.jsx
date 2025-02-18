import React, {useState, useEffect} from "react";
import {MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap} from "react-leaflet";
import L from "leaflet";

// Кастомна іконка
const customIcon = L.icon({
    iconUrl: "/marker-icon.svg",
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -35],
});

// Компонент для оновлення центру карти
const ChangeView = ({center}) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, 10); // Анімація переміщення
        }
    }, [center, map]);
    return null;
};

const Map = ({properties, onHexClick, selectedHex}) => {
    const [center, setCenter] = useState([50.088, 14.4208]); // Центр за замовчуванням (Прага)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCenter([position.coords.latitude, position.coords.longitude]);
                },
                (error) => {
                    console.log("Геолокацію не дозволено, використовується центр Праги", error);
                }
            );
        }
    }, []);

    console.log(center);

    return (
        <MapContainer center={center} zoom={10} style={{height: "100%", width: "100%"}}>
            <ChangeView center={center}/> {/* Оновлення центру карти */}

            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {properties.map((prop, index) => (
                <Marker key={index} position={[prop.latitude, prop.longitude]} icon={customIcon}>
                    <Popup>
                        <div>
                            <h3>ID: {prop.listing_id}</h3>
                            <p>Price: {prop.price}</p>
                            <p>Area: {prop.flat_area} м²</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
