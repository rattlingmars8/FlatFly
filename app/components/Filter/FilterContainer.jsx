"use client";

import { ChevronUp, Sliders } from "lucide-react";
import { motion } from "framer-motion";
import { formatNumber } from "@/utils/dataUtils.js";

const FilterContainer = ({
  children,
  isExpanded,
  onToggle,
  activeFilterCount,
  filters,
}) => {
  const getFilterChips = () => {
    const chips = [];

    if (filters.minPrice || filters.maxPrice) {
      const priceText =
        filters.minPrice && filters.maxPrice
          ? `${formatNumber(filters.minPrice)} - ${formatNumber(filters.maxPrice)}`
          : filters.minPrice
            ? `From ${formatNumber(filters.minPrice)}`
            : `Up to ${formatNumber(filters.maxPrice)}`;
      chips.push(priceText);
    }

    if (filters.minArea || filters.maxArea) {
      const areaText =
        filters.minArea && filters.maxArea
          ? `${filters.minArea} - ${filters.maxArea} m²`
          : filters.minArea
            ? `From ${filters.minArea} m²`
            : `Up to ${filters.maxArea} m²`;
      chips.push(areaText);
    }

    if (filters.disposition?.length) {
      chips.push(filters.disposition.join(", "));
    }

    return chips;
  };

  const filterChips = getFilterChips();

  return (
    <div className="bg-white shadow-xl rounded-2xl border border-purpleShades">
      <div className="p-5">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={onToggle}
        >
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5" />
            <h2 className="font-semibold text-lg">
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-purpleShades/30 text-primary/80 text-xs rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </h2>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronUp className="w-5 h-5" />
          </motion.div>
        </div>

        {filterChips.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {filterChips.map((chip, index) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                className="inline-flex items-center px-3 py-1.5 bg-purpleShades/30 text-primary/80 font-medium rounded-full text-sm whitespace-nowrap"
              >
                {chip}
              </motion.span>
            ))}
          </div>
        )}

        <motion.div
          className="overflow-hidden"
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{
            height: { duration: 0.3, ease: "easeInOut" },
            opacity: { duration: 0.2, delay: isExpanded ? 0.1 : 0 },
          }}
        >
          <div className="pt-4">{children}</div>
        </motion.div>
      </div>
    </div>
  );
};

export default FilterContainer;
