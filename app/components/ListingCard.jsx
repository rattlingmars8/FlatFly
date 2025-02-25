import {
  MdLocationOn,
  MdAttachMoney,
  MdCalendarMonth,
  MdSquareFoot,
} from "react-icons/md";

const ListingCard = ({ listing }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div
      key={listing._id}
      className="p-6 bg-purpleShades/15 rounded-xl shadow-md shadow-purpleShades hover:shadow-xl hover:shadow-purpleShades transition-transform duration-300 border border-gray-100 transform hover:scale-105"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-text ">
          <a
            href={listing.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {listing.name}
          </a>
        </h3>
        <hr className="mt-1 border-gray-400/70" />
      </div>

      <div className="flex items-center text-gray-500 mb-4">
        <MdLocationOn className="mr-2 text-secondary/80" size={20} />
        <span>{listing.locality}</span>
      </div>

      <div className="flex flex-col gap-3 mb-4 text-gray-700">
        <div className="flex items-center">
          <MdAttachMoney className="mr-2 text-secondary/80" size={20} />
          <span>
            Price:{" "}
            <span className="font-semibold">
              {listing.price.toLocaleString()} Kč
            </span>
          </span>
        </div>
        <div className="flex items-center">
          <MdSquareFoot className="mr-2 text-secondary/80" size={20} />
          <span>
            Flat Area:{" "}
            <span className="font-semibold">{listing.flat_area} m²</span>
          </span>
        </div>
        <div className="flex items-center">
          <MdAttachMoney className="mr-2 text-secondary/80" size={20} />
          <span>
            Price/m²:{" "}
            <span className="font-semibold">
              {listing.price_m2.toLocaleString()} Kč
            </span>
          </span>
        </div>
        <div className="flex items-center">
          <MdCalendarMonth className="mr-2 text-secondary/80" size={20} />
          <span>
            Last Seen:{" "}
            <span className="font-semibold">
              {formatDate(listing.last_seen_at)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
