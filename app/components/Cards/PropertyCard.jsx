"use client";

import Link from "next/link";
import {
  MdAttachMoney,
  MdCalendarMonth,
  MdLocationOn,
  MdSquareFoot,
} from "react-icons/md";
import { formatDate } from "@/utils/dataUtils.js";

const PropertyCard = ({ listing }) => {
  return (
    <>
      <div className="mb-6 w-full">
        <h3
          className="text-xl font-bold text-text mb-2"
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            href={listing.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-text"
          >
            {listing.name}
          </Link>
        </h3>
        <hr className="mt-1 border-gray-300" />
      </div>

      {/* loc */}
      <div className="flex items-center text-gray-700 mb-4">
        <MdLocationOn className="mr-2 text-purple-600" size={20} />
        <span>{listing.locality}</span>
      </div>

      {/* basic info */}
      <div className="flex flex-col gap-3 mb-4 text-gray-800">
        <div className="flex items-center">
          <MdAttachMoney className="mr-2 text-green-600" size={20} />
          <span>
            <strong>Price:</strong>{" "}
            <span className="font-semibold">
              {listing.price.toLocaleString()} Kč
            </span>
          </span>
        </div>
        <div className="flex items-center">
          <MdSquareFoot className="mr-2 text-blue-600" size={20} />
          <span>
            <strong>Flat Area:</strong>{" "}
            <span className="font-semibold">{listing.flat_area} m²</span>
          </span>
        </div>
        <div className="flex items-center">
          <MdAttachMoney className="mr-2 text-green-600" size={20} />
          <span>
            <strong>Price/m²:</strong>{" "}
            <span className="font-semibold">
              {listing.price_m2.toLocaleString()} Kč
            </span>
          </span>
        </div>
        <div className="flex items-center">
          <MdCalendarMonth className="mr-2 text-orange-500" size={20} />
          <span>
            <strong>Last Seen:</strong>{" "}
            <span className="font-semibold">
              {formatDate(listing.last_seen_at)}
            </span>
          </span>
        </div>
      </div>
    </>
  );
};
export default PropertyCard;
