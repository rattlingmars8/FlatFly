"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMap,
  useMapEvents,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { cellToBoundary, latLngToCell } from "h3-js";
import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import PropertyCard from "@/app/components/Cards/PropertyCard.jsx";

const MapEventsHandler = ({
  onViewportChange,
  onSelectHex,
  hexPolygons,
  setHexPolygons,
  fixedResolution,
}) => {
  const map = useMap();
  const debounceRef = useRef(null);

  useEffect(() => {
    if (map) {
      const bounds = map.getBounds();
      onViewportChange({
        swLat: bounds.getSouthWest().lat,
        swLng: bounds.getSouthWest().lng,
        neLat: bounds.getNorthEast().lat,
        neLng: bounds.getNorthEast().lng,
        zoom: map.getZoom(),
      });
    }
  }, [map, onViewportChange]);

  useMapEvents({
    moveend: () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const bounds = map.getBounds();
        onViewportChange({
          swLat: bounds.getSouthWest().lat,
          swLng: bounds.getSouthWest().lng,
          neLat: bounds.getNorthEast().lat,
          neLng: bounds.getNorthEast().lng,
          zoom: map.getZoom(),
        });
      }, 1000);
    },
    click: (e) => {
      const { lat, lng } = e.latlng;
      const h3Index = latLngToCell(lat, lng, fixedResolution);
      if (hexPolygons.length > 0 && hexPolygons[0].hexId === h3Index) {
        setHexPolygons([]);
        onSelectHex(null);
      } else {
        const boundary = cellToBoundary(h3Index, true).map(([lat, lng]) => [
          lng,
          lat,
        ]);
        const newHex = { hexId: h3Index, positions: boundary };
        setHexPolygons([newHex]);
        onSelectHex(h3Index);
      }
    },
  });

  return null;
};

const MapComponent = ({
  center,
  zoom,
  mapListings,
  selectedHex,
  onSelectHex,
  onViewportChange,
}) => {
  const [hexPolygons, setHexPolygons] = useState([]);
  const fixedResolution = 8;

  const customIcon = L.icon({
    iconUrl: "/map-pointer.svg",
    iconSize: [40, 30],
    popupAnchor: [0, -15],
  });

  useEffect(() => {
    if (!selectedHex) {
      setHexPolygons([]);
    }
  }, [selectedHex]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapEventsHandler
        onViewportChange={onViewportChange}
        onSelectHex={onSelectHex}
        hexPolygons={hexPolygons}
        setHexPolygons={setHexPolygons}
        fixedResolution={fixedResolution}
      />
      <MarkerClusterGroup>
        {(mapListings || []).map((listing) => (
          <Marker
            key={listing._id}
            position={[listing.latitude, listing.longitude]}
            icon={customIcon}
          >
            <Popup>
              <PropertyCard listing={listing} />
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      {hexPolygons.map((polygon) => (
        <Polygon
          key={polygon.hexId}
          positions={polygon.positions}
          eventHandlers={{
            click: () => {
              setHexPolygons([]);
              onSelectHex(null);
            },
          }}
          fillColor="blue"
          fillOpacity={0.3}
          color="blue"
          weight={2}
        />
      ))}
    </MapContainer>
  );
};

export default MapComponent;
