import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MdLocationOn,
  MdAttachMoney,
  MdCalendarMonth,
  MdSquareFoot,
} from "react-icons/md";
import Modal from "./Modal";
import { formatDate } from "@/utils/dataUtils";

const ListingCard = ({ listing }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <>
        <motion.div
          key={listing._id}
          layoutId={`card-container-${listing._id}`}
          onClick={openModal}
          className="p-6 bg-purpleShades/15 rounded-xl shadow-md shadow-purpleShades hover:shadow-xl hover:shadow-purpleShades transition-transform duration-300 border border-gray-100 transform hover:scale-105"
        >
          <div className="mb-6">
            <h3
              className="text-xl font-bold text-gray-900 mb-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Link
                href={listing.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
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

          <p className="text-xs text-center text-gray-600 italic">
            (Click anywhere on the card for more details)
          </p>
        </motion.div>
      </>

      <Modal isOpen={modalOpen} onClose={closeModal} listing={listing} />
    </>
  );
};

export default ListingCard;
