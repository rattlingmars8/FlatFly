import { FaceFrownIcon } from "@heroicons/react/16/solid";

const NoDataMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg text-center">
      <FaceFrownIcon className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-orange-600 mb-2">
        No Data Available
      </h3>
      <p className="text-gray-500 mb-4">
        There is no data to display for that filters/sector.
      </p>
    </div>
  );
};

export default NoDataMessage;
