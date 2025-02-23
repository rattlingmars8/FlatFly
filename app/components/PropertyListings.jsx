import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const PropertyListings = ({loading, listings, totalMatches}) => {
  return (
    <>

      <div className="bg-purpleShades p-6 rounded-lg shadow-md shadow-purpleShades mb-6 border-secondary border-2">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Listings</h2>
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-700">
            Total Matches:{" "}
            <span className="font-semibold text-primary">{loading ? (
              <Skeleton className="inline max-w-14 h-5" />
            ) : (totalMatches)}
            </span>
          </h3>
          <p className="text-gray-600">
            Shown:{" "}
            <span className="font-semibold text-primary">{loading ? (
              <Skeleton className="inline max-w-14 h-5" />
            ) : (listings.length)}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading
          ? Array(10)
            .fill(null)
            .map((_, i) => (
              <Skeleton key={`item-${i}`} className="w-full h-[200px]"/>
            ))
          : listings.map((listing) => (
            <div key={listing._id} className="p-4 bg-white rounded shadow">
              <h3 className="text-lg font-bold">{listing.name}</h3>
              <p className="text-gray-600">{listing.locality}</p>
              <p className="mt-2">
                <span className="font-semibold">Price:</span>{" "}
                {listing.price.toLocaleString()} Kč
              </p>
              <p>
                <span className="font-semibold">Area:</span> {listing.area} m²
              </p>
              <p>
                <span className="font-semibold">Price/m²:</span>{" "}
                {listing.price_m2.toLocaleString()} Kč
              </p>
              <a
                href={listing.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-blue-600 hover:underline"
              >
                View Details
              </a>
            </div>
          ))}
      </div>
    </>
  );
};

export default PropertyListings;