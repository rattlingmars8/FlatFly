"use client";
import dynamic from "next/dynamic";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import FilterSection from "./FilterSection";
import PropertyListings from "./PropertyListings";
import AnalyticsPanel from "./AnalyticsPanel";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

const defaultFilters = {
  minPrice: "",
  maxPrice: "",
  minArea: "",
  maxArea: "",
  disposition: [],
};

const fetcher = (url) => fetch(url).then((res) => res.json());

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
    const params = new URLSearchParams();
    Object.entries(filtersFromUrl).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length) {
          params.append(key, value.join(","));
        }
      } else if (value) {
        params.append(key, value);
      }
    });
    return params.toString();
  }, [filtersFromUrl]);

  const { data: listings, error: listingsError } = useSWR(
    `/api/listings${listingsQueryString ? `?${listingsQueryString}` : ""}`,
    fetcher
  );

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
    router.push(`/?${params.toString()}`, undefined, { shallow: true });
  }, [formFilters, router]);


  const handleFormReset = useCallback(() => {
    router.push("/", undefined, { shallow: true });
  }, [router]);

  return (
    <div className="flex flex-col gap-8 p-8 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/3 bg-white shadow-xl rounded-2xl p-6 border border-borderGray">
          <FilterSection
            filters={formFilters}
            onFilterChange={handleFilterChange}
            onSubmit={handleFormSubmit}
            onReset={handleFormReset}
          />
        </div>
        <div className="md:w-2/3 w-full relative h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden shadow-xl border border-borderGray">
          <MapComponent
            listings={listings || []}
            hexStats={stats || {}}
            onSelectHex={setSelectedHex}
          />
        </div>
      </div>

      {selectedHex && (
        <AnalyticsPanel
          selectedHex={selectedHex}
          stats={stats || {}}
          onClose={() => setSelectedHex(null)}
        />
      )}

      <PropertyListings listings={listings || []} />
    </div>
  );
};

export default Home;

