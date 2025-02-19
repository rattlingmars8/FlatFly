"use client";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMapEvents,
} from "react-leaflet";
import { cellToBoundary, latLngToCell } from "h3-js";
import { useState } from "react";
import L from "leaflet";

const MapComponent = ({ listings, onSelectHex }) => {
  const [hexPolygons, setHexPolygons] = useState([]);

  // Example "881e354a31fffff"
  const fixedResolution = 8;

  const customIcon = L.icon({
    iconUrl: "/marker-icon.svg",
    iconSize: [20, 30],
    iconAnchor: [10, 30],
    popupAnchor: [0, -35],
  });

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;

        const h3Index = latLngToCell(lat, lng, fixedResolution);

        if (hexPolygons.some((hex) => hex.hexId === h3Index)) {
          setHexPolygons((prev) => prev.filter((hex) => hex.hexId !== h3Index));
          onSelectHex(null);
        } else {
          const boundary = cellToBoundary(h3Index, true).map(([lat, lng]) => [
            lng,
            lat,
          ]);
          const newHex = { hexId: h3Index, positions: boundary };
          setHexPolygons((prev) => [...prev, newHex]);
          onSelectHex(h3Index);
        }
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={[50.102482, 14.566278]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, CC BY 3.0 — Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      <MapClickHandler />
      {hexPolygons.map((polygon) => (
        <Polygon
          key={polygon.hexId}
          positions={polygon.positions}
          eventHandlers={{
            click: () => {
              setHexPolygons((prev) =>
                prev.filter((hex) => hex.hexId !== polygon.hexId),
              );
              onSelectHex(null);
            },
          }}
          fillColor="blue"
          fillOpacity={0.3}
          color="blue"
          weight={2}
        />
      ))}
      {listings.map((listing) => (
        <Marker
          key={listing.id}
          position={[listing.latitude, listing.longitude]}
          icon={customIcon}
        >
          <Popup>
            <div>
              <h3>{listing.name}</h3>
              <p>{listing.price.toLocaleString()} Kč</p>
              <p>{listing.area} m²</p>
              <p>{listing.locality}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
