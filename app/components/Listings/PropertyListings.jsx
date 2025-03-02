"use client";

import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import ListingCard from "../Cards/ListingCard.jsx";
import NoDataMessage from "../NoDataMessage.jsx";
import { Building2 } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2,
    },
  },
};

const PropertyListings = ({ loading, listings, totalMatches }) => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purpleShades/10 rounded-lg">
            <Building2 className="w-5 h-5 text-purpleShades" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Available Properties
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>
                {loading ? <Skeleton width={30} /> : `${totalMatches} total`}
              </span>
              <span>•</span>
              <span>
                {loading ? <Skeleton width={30} /> : `${listings.length} shown`}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
          >
            {Array(9)
              .fill(null)
              .map((_, i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  variants={itemVariants}
                  className="h-full"
                >
                  <Skeleton className="w-full h-full min-h-[300px] rounded-xl" />
                </motion.div>
              ))}
          </motion.div>
        ) : listings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="col-span-full"
          >
            <NoDataMessage currentPage="Property Listings" />
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            {listings.map((listing) => (
              <motion.div
                key={listing._id}
                variants={itemVariants}
                className="h-full"
              >
                <ListingCard listing={listing} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertyListings;
