"use client";
import dynamic from "next/dynamic";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import FilterSection from "./FilterSection";
import PropertyListings from "./PropertyListings";
import AnalyticsPanel from "./AnalyticsPanel";
import Pagination from "@/app/components/Pagination";
import { fetcher, useListings } from "@/app/hooks/useListings";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NoDataMessage from "@/app/components/NoDataMessage";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

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
    <div className="flex flex-col gap-8 p-8 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/3 bg-white shadow-xl shadow-purpleShades rounded-2xl p-6 border border-purpleShades">
          <FilterSection
            filters={formFilters}
            onFilterChange={handleFilterChange}
            onSubmit={handleFormSubmit}
            onReset={handleFormReset}
          />
        </div>
        <div className="md:w-2/3 w-full relative h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden shadow-xl shadow-purpleShades border border-borderGray">
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
              onSelectHex={setSelectedHex}
            />
          )}
        </div>
      </div>

      {selectedHex && (
        <AnalyticsPanel
          selectedHex={selectedHex}
          stats={stats || {}}
          onClose={() => setSelectedHex(null)}
        />
      )}

      <div className="flex flex-col gap-8">
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
    </div>
  );
};

export default Home;
