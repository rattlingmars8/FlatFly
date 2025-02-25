import Skeleton from "react-loading-skeleton";
import AppliedFilters from "./AppliedFilters";
import ListingCard from "./ListingCard";

const PropertyListings = ({ loading, listings, totalMatches, filters }) => {
  return (
    <>
      <div className="bg-white p-3 md:p-6 rounded-lg shadow space-y-6 border border-gray-200">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold text-gray-900">
            Property Listings
          </h2>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">
                Total Matches:
              </span>
              <span className="text-xl font-bold text-secondary">
                {loading ? (
                  <Skeleton inline width={50} height={24} />
                ) : (
                  totalMatches
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Shown:</span>
              <span className="text-xl font-bold text-secondary">
                {loading ? (
                  <Skeleton inline width={50} height={24} />
                ) : (
                  listings.length
                )}
              </span>
            </div>
          </div>
        </div>

        <AppliedFilters filters={filters} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {loading
            ? Array(10)
                .fill(null)
                .map((_, i) => (
                  <Skeleton key={`item-${i}`} className="w-full h-[200px]" />
                ))
            : listings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
        </div>
      </div>
    </>
  );
};

export default PropertyListings;
