"use client";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./components/MapComponent"), { ssr: false });
import { useEffect, useState, useMemo } from "react";
import FilterSection from "./components/FilterSection";
import PropertyListings from "./components/PropertyListings";
import AnalyticsPanel from "./components/AnalyticsPanel";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [stats, setStats] = useState({});
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
    disposition: [],
  });
  const [selectedHex, setSelectedHex] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setStats(data);
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchListings = async () => {
      const queryString = new URLSearchParams(filters).toString();
      const res = await fetch(`/api/listings?${queryString}`);
      const data = await res.json();
      setListings(data);
    };
    fetchListings();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleFormReset = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      minArea: "",
      maxArea: "",
      disposition: [],
    });
  };

  const filteredListings = useMemo(() => listings, [listings]);

  return (
    <div className="flex flex-col gap-8 p-8 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/3 bg-white shadow-xl rounded-2xl p-6 border border-borderGray">
          <FilterSection
            filters={filters}
            onFilterChange={handleFilterChange}
            onSubmit={handleFormSubmit}
            onReset={handleFormReset}
          />
        </div>

        <div className="md:w-2/3 w-full relative h-[35vh] md:h-[60vh] rounded-2xl overflow-hidden shadow-xl border border-borderGray">
          <MapComponent
            listings={filteredListings}
            hexStats={stats}
            onSelectHex={setSelectedHex}
          />
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 border border-borderGray">
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Property Listings
        </h2>
        <PropertyListings listings={filteredListings} />
      </div>

      {selectedHex && (
        <AnalyticsPanel
          selectedHex={selectedHex}
          stats={stats}
          onClose={() => setSelectedHex(null)}
        />
      )}
    </div>
  );
};

export default Home;
