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
import { useState, useEffect, useRef, useMemo } from "react";
import L from "leaflet";
import MapPropertyCard from "../Cards/MapPropertyCard.jsx";

const MapEventsHandler = ({
  onViewportChange,
  onSelectHex,
  hexPolygons,
  setHexPolygons,
  fixedResolution,
}) => {
  const map = useMap();
  const debounceRef = useRef(null);

  const isPopupOpen = useRef(false);

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
    popupopen: () => {
      isPopupOpen.current = true;
    },
    popupclose: () => {
      isPopupOpen.current = false;
    },
    moveend: () => {
      if (isPopupOpen.current) return; // Забороняємо оновлення, якщо попап відкритий

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
      }, 500);
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

  const customIcon = useMemo(
    () =>
      L.icon({
        iconUrl: "/map-pointer.svg",
        iconSize: [40, 30],
        popupAnchor: [0, -15],
      }),
    [],
  );

  useEffect(() => {
    if (!selectedHex) {
      setHexPolygons([]);
    }
  }, [selectedHex]);

  const uniqueMapListings = useMemo(() => {
    const unique = new Map();
    (mapListings || []).forEach((item) => {
      unique.set(item._id, item);
    });
    return Array.from(unique.values());
  }, [mapListings]);

  const markers = useMemo(
    () => (
      <MarkerClusterGroup disableClusteringAtZoom={18}>
        {uniqueMapListings.map((listing) => (
          <Marker
            key={listing._id}
            position={[listing.latitude, listing.longitude]}
            icon={customIcon}
          >
            <Popup className={"min-w-[300px]"}>
              <MapPropertyCard id={listing._id} />
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    ),
    [uniqueMapListings, customIcon],
  );

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
      {markers}
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
