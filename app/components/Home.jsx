"use client";
import dynamic from "next/dynamic";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import FilterSection from "./Filter/FilterSection.jsx";
import PropertyListings from "./Listings/PropertyListings.jsx";
import AnalyticsPanel from "./Analytics/AnalyticsPanel.jsx";
import Pagination from "@/app/components/Listings/Pagination.jsx";
import { fetcher, useListings } from "@/app/hooks/useListings";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AnimatePresence } from "framer-motion";

const MapComponent = dynamic(() => import("./Map/MapComponent.jsx"), {
  ssr: false,
});

const defaultFilters = {
  minPrice: "",
  maxPrice: "",
  minArea: "",
  maxArea: "",
  disposition: [],
};

const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchString = useMemo(() => searchParams.toString(), [searchParams]);

  const filtersFromUrl = useMemo(() => {
    const params = new URLSearchParams(searchString);
    const minPrice = params.get("minPrice") || "";
    const maxPrice = params.get("maxPrice") || "";
    const minArea = params.get("minArea") || "";
    const maxArea = params.get("maxArea") || "";
    const disposition = params.get("disposition")
      ? params.get("disposition").split(",")
      : [];
    return { minPrice, maxPrice, minArea, maxArea, disposition };
  }, [searchString]);

  const [formFilters, setFormFilters] = useState(defaultFilters);
  const [selectedHex, setSelectedHex] = useState(null);
  const [mapBounds, setMapBounds] = useState(null);
  const [mapZoom, setMapZoom] = useState(null);
  const prevBoundsRef = useRef(null);

  useEffect(() => {
    setFormFilters(filtersFromUrl);
  }, [filtersFromUrl]);

  const computedCenter = useMemo(() => {
    const params = new URLSearchParams(searchString);
    const swLat = params.get("swLat");
    const swLng = params.get("swLng");
    const neLat = params.get("neLat");
    const neLng = params.get("neLng");
    if (swLat && swLng && neLat && neLng) {
      return [
        (parseFloat(swLat) + parseFloat(neLat)) / 2,
        (parseFloat(swLng) + parseFloat(neLng)) / 2,
      ];
    }
    return [50.087805, 14.416713];
  }, [searchString]);

  const computedZoom = useMemo(() => {
    const params = new URLSearchParams(searchString);
    const z = params.get("zoom");
    if (z) return parseFloat(z);
    return 13;
  }, [searchString]);

  useEffect(() => {
    if (mapBounds && mapZoom !== null) {
      const prevBounds = prevBoundsRef.current;
      const boundsChanged =
        !prevBounds ||
        prevBounds.swLat !== mapBounds.swLat ||
        prevBounds.swLng !== mapBounds.swLng ||
        prevBounds.neLat !== mapBounds.neLat ||
        prevBounds.neLng !== mapBounds.neLng ||
        prevBounds.zoom !== mapZoom;
      if (boundsChanged) {
        const params = new URLSearchParams(searchString);
        params.set("page", "1");
        params.set("swLat", mapBounds.swLat);
        params.set("swLng", mapBounds.swLng);
        params.set("neLat", mapBounds.neLat);
        params.set("neLng", mapBounds.neLng);
        params.set("zoom", mapZoom);
        router.replace(`/?${params.toString()}`, { scroll: false });
        prevBoundsRef.current = { ...mapBounds, zoom: mapZoom };
      }
    }
  }, [mapBounds, mapZoom, router, searchString]);

  const listingsQueryString = useMemo(() => {
    const params = new URLSearchParams(searchString);
    if (
      !params.get("swLat") ||
      !params.get("swLng") ||
      !params.get("neLat") ||
      !params.get("neLng")
    ) {
      return null;
    }
    if (!params.get("page")) {
      params.set("page", "1");
    }
    const sp = new URLSearchParams();
    Object.entries(filtersFromUrl).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length) sp.append(key, value.join(","));
      } else if (value) {
        sp.append(key, value);
      }
    });
    sp.set("page", params.get("page"));
    sp.set("swLat", params.get("swLat"));
    sp.set("swLng", params.get("swLng"));
    sp.set("neLat", params.get("neLat"));
    sp.set("neLng", params.get("neLng"));
    sp.set("zoom", params.get("zoom") || computedZoom);
    return sp.toString();
  }, [filtersFromUrl, searchString, computedZoom]);

  const {
    listings,
    totalMatches,
    totalPages,
    mapListings,
    currentPage,
    loading,
  } = useListings(listingsQueryString);
  const { data: stats, error: statsError } = useSWR("/api/stats", fetcher);

  const handleFilterChange = useCallback((newFilters) => {
    setFormFilters(newFilters);
  }, []);

  const handleFormSubmit = useCallback(() => {
    const params = new URLSearchParams();
    Object.entries(formFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length) params.append(key, value.join(","));
      } else if (value) {
        params.append(key, value);
      }
    });
    params.set("page", "1");
    if (mapBounds) {
      params.set("swLat", mapBounds.swLat);
      params.set("swLng", mapBounds.swLng);
      params.set("neLat", mapBounds.neLat);
      params.set("neLng", mapBounds.neLng);
    }
    if (mapZoom !== null) {
      params.set("zoom", mapZoom);
    }
    router.push(`/?${params.toString()}`, { scroll: false });
  }, [formFilters, mapBounds, mapZoom, router]);

  const handleFormReset = useCallback(() => {
    const params = new URLSearchParams(searchString);
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("minArea");
    params.delete("maxArea");
    params.delete("disposition");
    params.set("page", "1");
    router.push(`/?${params.toString()}`, { scroll: false });
  }, [router, searchString]);

  const handleViewportChange = useCallback((viewportData) => {
    setMapBounds({
      swLat: viewportData.swLat,
      swLng: viewportData.swLng,
      neLat: viewportData.neLat,
      neLng: viewportData.neLng,
    });
    setMapZoom(viewportData.zoom);
  }, []);

  return (
    <div className="w-full p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="order-1 lg:order-2 flex flex-col gap-8 lg:w-2/3">
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-purpleShades">
            <FilterSection
              filters={formFilters}
              onFilterChange={handleFilterChange}
              onSubmit={handleFormSubmit}
              onReset={handleFormReset}
              loading={loading}
            />
          </div>
          <PropertyListings
            loading={loading}
            listings={listings}
            totalMatches={totalMatches}
            filters={filtersFromUrl}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            queryParams={searchParams}
            loading={loading}
          />
        </div>

        <div className="order-2 lg:order-1 flex flex-col gap-4 lg:w-1/3">
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-borderGray h-[50vh] lg:h-[90vh]">
            {statsError ? (
              <div className="p-4 text-center text-red-500">
                Error loading map data
              </div>
            ) : !stats ? (
              <div className="p-4 flex justify-center items-center h-full">
                <Skeleton height="100%" width="100%" />
              </div>
            ) : (
              <MapComponent
                center={computedCenter}
                zoom={computedZoom}
                listings={listings}
                mapListings={mapListings}
                hexStats={stats}
                selectedHex={selectedHex}
                onSelectHex={setSelectedHex}
                onViewportChange={handleViewportChange}
              />
            )}
          </div>

          <AnimatePresence>
            {selectedHex && (
              <AnalyticsPanel
                selectedHex={selectedHex}
                stats={stats || {}}
                onClose={() => setSelectedHex(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Home;
