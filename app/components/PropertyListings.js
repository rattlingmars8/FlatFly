const PropertyListings = ({ listings }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {listings.map((listing) => (
        <div key={listing.id} className="p-4 bg-white rounded shadow">
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
            {listing.priceM2.toLocaleString()} Kč
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
  );
};

export default PropertyListings;
