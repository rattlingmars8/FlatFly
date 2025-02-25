import { motion } from "framer-motion";
import { PieChart } from "react-minimal-pie-chart";
import NoDataMessage from "./NoDataMessage";

const AnalyticsPanel = ({ selectedHex, stats, onClose }) => {
  const hexStats = stats[selectedHex];

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.5 } },
  };

  if (!hexStats) {
    return (
      <motion.div
        className="w-full md:w-1/2 bg-background p-6 rounded-2xl shadow-2xl border border-borderGray m-4 relative self-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        <NoDataMessage currentPage={selectedHex} />
      </motion.div>
    );
  }

  const colors = [
    "#4CAF50",
    "#FF9800",
    "#2196F3",
    "#9C27B0",
    "#F44336",
    "#3F51B5",
  ];
  const pieData = Object.entries(hexStats.dispositionDistribution).map(
    ([type, percentage], index) => ({
      title: type,
      value: percentage * 100,
      color: colors[index % colors.length],
    }),
  );

  return (
    <motion.div
      className="w-full md:w-1/2 bg-background p-6 rounded-2xl shadow-2xl border border-borderGray m-4 relative self-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        onClick={onClose}
      >
        ✕
      </button>
      <h3 className="text-xl font-bold mb-4 text-primary text-center">
        Analytics for Hex {selectedHex}
      </h3>
      <p className="mb-2 text-text text-center">
        <span className="font-semibold">Avg Price Change:</span>{" "}
        {hexStats.avgPriceChange.toFixed(2)}%
      </p>
      <p className="mb-4 text-text text-center">
        <span className="font-semibold">Active Listings:</span>{" "}
        {hexStats.activeListings}
      </p>
      <h4 className="text-lg font-bold mt-4 mb-2 text-gray-900 text-center">
        Disposition Distribution:
      </h4>
      <div className="flex flex-col items-center">
        <PieChart
          data={pieData}
          animate
          animationDuration={650}
          animationEasing="ease-out"
          lineWidth={20}
          paddingAngle={2}
          rounded
          label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
          labelStyle={{
            fontSize: "10px",
            fontFamily: "sans-serif",
            fill: "#fff",
          }}
          labelPosition={0}
          style={{ height: "200px" }}
        />
        {/* legend */}
        <div className="mt-4 w-full max-w-sm">
          {pieData.map((entry) => (
            <div
              key={entry.title}
              className="flex items-center justify-between py-1 border-b last:border-0"
            >
              <div className="flex items-center">
                <span
                  className="inline-block w-4 h-4 mr-2 rounded"
                  style={{ backgroundColor: entry.color }}
                ></span>
                <span className="text-sm font-medium text-gray-700">
                  {entry.title}
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {entry.value.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsPanel;
