"use client";
import React, { useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdLocationOn,
  MdAttachMoney,
  MdCalendarMonth,
  MdSquareFoot,
} from "react-icons/md";
import { formatDate } from "@/utils/dataUtils";

const Modal = ({ isOpen, onClose, listing }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          {/* backdrop */}
          <motion.div
            className="fixed inset-0 z-[1000] bg-black bg-opacity-50 flex items-center justify-center"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              tabIndex={0}
              className="relative bg-gray-50 rounded-xl p-6 sm:p-8 max-w-lg sm:max-w-3xl w-[90%] sm:w-full overflow-y-auto max-h-[80vh] sm:max-h-[90vh] shadow-2xl border border-gray-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, y: 50, transition: { duration: 0.2 } }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl sm:text-2xl"
                aria-label="Close modal"
              >
                &times;
              </button>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 sm:mb-6 text-center">
                {listing.name}
              </h2>

              {/* main */}
              <div className="space-y-3 sm:space-y-4 text-gray-700">
                <div className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                  <MdLocationOn className="text-purple-600 w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-semibold text-gray-800">Locality:</span>
                  <span>{listing.locality}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 bg-gray-100 p-3 sm:p-4 rounded-lg shadow-sm text-sm sm:text-base">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <MdAttachMoney className="text-green-600 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold text-gray-800">Price:</span>
                    <span>{listing.price.toLocaleString()} Kč</span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <MdSquareFoot className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold text-gray-800">
                      Flat Area:
                    </span>
                    <span>{listing.flat_area} m²</span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <MdAttachMoney className="text-green-600 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold text-gray-800">
                      Price/m²:
                    </span>
                    <span>{listing.price_m2.toLocaleString()} Kč</span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <MdCalendarMonth className="text-orange-500 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold text-gray-800">
                      Last Seen:
                    </span>
                    <span>{formatDate(listing.last_seen_at)}</span>
                  </div>
                </div>

                {/* desc */}
                {listing.description && (
                  <div className="p-3 sm:p-4 bg-white border-l-4 border-purple-600 rounded-lg shadow-sm flex items-start gap-1 sm:gap-2 text-sm sm:text-base">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Description:
                      </p>
                      <p className="text-gray-700">{listing.description}</p>
                    </div>
                  </div>
                )}

                <div className="mt-4 sm:mt-6 text-center">
                  <a
                    href={listing.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 sm:px-4 py-2 bg-primary text-white rounded hover:bg-secondary items-center justify-center transition text-sm sm:text-base"
                  >
                    View Original Listing
                  </a>
                </div>
              </div>
            </motion.section>
          </motion.div>
        </Fragment>
      )}
    </AnimatePresence>
  );
};

export default Modal;
