import React from "react";

const AnalyticsPanel = ({ selectedHex, stats, onClose }) => {
  const hexStats = stats[selectedHex];
  if (!hexStats) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[1000] backdrop-blur-sm">
      <div className="bg-background p-6 rounded-2xl shadow-2xl w-full max-w-[500px] relative animate-fadeIn border border-borderGray m-4">
        {/* Кнопка закриття */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="text-xl font-bold mb-4 text-primary text-center">
          Analytics for Hex {selectedHex}
        </h3>

        <p className="mb-2 text-text">
          <span className="font-semibold">Avg Price Change:</span>{" "}
          {hexStats.avgPriceChange.toFixed(2)}%
        </p>

        <p className="mb-2 text-text">
          <span className="font-semibold">Active Listings:</span>{" "}
          {hexStats.activeListings}
        </p>

        <h4 className="text-lg font-bold mt-4 mb-2 text-gray-900">
          Disposition Distribution:
        </h4>
        <ul className="list-disc pl-5 text-text">
          {Object.entries(hexStats.dispositionDistribution).map(
            ([type, percentage]) => (
              <li key={type}>
                {type}: {(percentage * 100).toFixed(2)}%
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
