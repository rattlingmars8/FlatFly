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
import { AnimatePresence, motion } from "framer-motion";
import FilterContainer from "@/app/components/Filter/FilterContainer.jsx";

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
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);

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

  const hasActiveFilters = useMemo(() => {
    return Object.values(filtersFromUrl).some(
      (value) =>
        (Array.isArray(value) && value.length > 0) ||
        (typeof value === "string" && value !== ""),
    );
  }, [filtersFromUrl]);

  const [formFilters, setFormFilters] = useState(defaultFilters);
  const [selectedHex, setSelectedHex] = useState(null);
  const [mapBounds, setMapBounds] = useState(null);
  const [mapZoom, setMapZoom] = useState(null);
  const prevBoundsRef = useRef(null);

  useEffect(() => {
    setFormFilters(filtersFromUrl);
  }, [filtersFromUrl]);

  useEffect(() => {
    if (hasActiveFilters) {
      setIsFilterExpanded(false);
    }
  }, [hasActiveFilters]);

  const computedCenter = useMemo(() => {
    const params = new URLSearchParams(searchString);
    const swLat = params.get("swLat");
    const swLng = params.get("swLng");
    const neLat = params.get("neLat");
    const neLng = params.get("neLng");
    if (swLat && swLng && neLat && neLng) {
      return [
        (Number.parseFloat(swLat) + Number.parseFloat(neLat)) / 2,
        (Number.parseFloat(swLng) + Number.parseFloat(neLng)) / 2,
      ];
    }
    return [50.087805, 14.416713];
  }, [searchString]);

  const computedZoom = useMemo(() => {
    const params = new URLSearchParams(searchString);
    const z = params.get("zoom");
    if (z) return Number.parseFloat(z);
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

    setIsFilterExpanded(false);
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

    setIsFilterExpanded(true);
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

  const toggleFilters = useCallback(() => {
    setIsFilterExpanded((prev) => !prev);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filtersFromUrl.minPrice) count++;
    if (filtersFromUrl.maxPrice) count++;
    if (filtersFromUrl.minArea) count++;
    if (filtersFromUrl.maxArea) count++;
    if (filtersFromUrl.disposition.length) count++;
    return count;
  }, [filtersFromUrl]);

  return (
    <div className="lg:max-w-[75%] mx-auto xl:px-20 md:px-10 sm:px-6 px-4 py-6">
      <div className="flex flex-col gap-6">
        <FilterContainer
          isExpanded={isFilterExpanded}
          onToggle={toggleFilters}
          activeFilterCount={activeFilterCount}
          filters={filtersFromUrl}
        >
          <FilterSection
            filters={formFilters}
            onFilterChange={handleFilterChange}
            onSubmit={handleFormSubmit}
            onReset={handleFormReset}
            loading={loading}
          />
        </FilterContainer>

        <motion.div
          layout="position"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden shadow-xl border border-borderGray h-[40vh] md:h-[50vh]"
        >
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
        </motion.div>

        <AnimatePresence>
          {selectedHex && (
            <AnalyticsPanel
              selectedHex={selectedHex}
              stats={stats || {}}
              onClose={() => setSelectedHex(null)}
            />
          )}
        </AnimatePresence>

        <PropertyListings
          loading={loading}
          listings={listings}
          totalMatches={totalMatches}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          queryParams={searchParams}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Home;
