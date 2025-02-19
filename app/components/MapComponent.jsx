import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import { cellToBoundary } from "h3-js";
import L from "leaflet";

const MapComponent = ({ listings, hexStats, onSelectHex }) => {
  const [hexPolygons, setHexPolygons] = useState([]);

  const customIcon = L.icon({
    iconUrl: "/marker-icon.svg",
    iconSize: [20, 30],
    iconAnchor: [10, 30],
    popupAnchor: [0, -35],
  });

  useEffect(() => {
    const polygons = [];
    for (const hexId in hexStats) {
      const boundary = cellToBoundary(hexId, true);
      polygons.push({
        hexId,
        positions: boundary.map(([lat, lng]) => [lng, lat]),
      });
    }
    setHexPolygons(polygons);
  }, [hexStats]);

  return (
    <MapContainer
      center={[50.102482, 14.566278]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {hexPolygons.map((polygon) => (
        <Polygon
          key={polygon.hexId}
          positions={polygon.positions}
          eventHandlers={{
            click: () => onSelectHex(polygon.hexId),
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
