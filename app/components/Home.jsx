"use client";
import dynamic from "next/dynamic";
import { useState, useMemo, useCallback, useEffect } from "react";
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

  const filtersFromUrl = useMemo(() => {
    if (!searchParams) return defaultFilters;
    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const minArea = searchParams.get("minArea") || "";
    const maxArea = searchParams.get("maxArea") || "";
    const disposition = searchParams.get("disposition")
      ? searchParams.get("disposition").split(",")
      : [];
    return { minPrice, maxPrice, minArea, maxArea, disposition };
  }, [searchParams]);

  const [formFilters, setFormFilters] = useState(defaultFilters);
  const [selectedHex, setSelectedHex] = useState(null);

  useEffect(() => {
    setFormFilters(filtersFromUrl);
  }, [filtersFromUrl]);

  const listingsQueryString = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());
    if (!params.page) {
      params.page = "1";
    }
    const sp = new URLSearchParams();
    Object.entries(filtersFromUrl).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length) {
          sp.append(key, value.join(","));
        }
      } else if (value) {
        sp.append(key, value);
      }
    });
    sp.set("page", params.page);
    return sp.toString();
  }, [filtersFromUrl, searchParams]);

  const { listings, totalMatches, totalPages, currentPage, loading } =
    useListings(listingsQueryString);
  const { data: stats, error: statsError } = useSWR("/api/stats", fetcher);

  const handleFilterChange = useCallback((newFilters) => {
    setFormFilters(newFilters);
  }, []);

  const handleFormSubmit = useCallback(() => {
    const params = new URLSearchParams();
    Object.entries(formFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length) {
          params.append(key, value.join(","));
        }
      } else if (value) {
        params.append(key, value);
      }
    });
    params.set("page", "1");
    router.push(`/?${params.toString()}`, { scroll: false });
  }, [formFilters, router]);

  const handleFormReset = useCallback(() => {
    router.push("/", { scroll: false });
  }, [router]);

  return (
    <div className="w-full p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters, Property Listings, and Pagination */}
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

        {/* Map and Analytics Panel */}
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
                listings={listings}
                hexStats={stats}
                selectedHex={selectedHex}
                onSelectHex={setSelectedHex}
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
