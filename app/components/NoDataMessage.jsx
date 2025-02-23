import {FaceFrownIcon} from "@heroicons/react/16/solid";

const NoDataMessage = ({currentPage, onReset}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg shadow-sm text-center">

      <FaceFrownIcon className="w-16 h-16 text-gray-400 mb-4"/>
      <h3 className="text-xl font-semibold text-orange-600 mb-2">
        No Data Available
      </h3>
      <p className="text-gray-500 mb-4">
        There is no data to display for page{" "}
        <span className="font-extrabold text-gray-700">{currentPage}</span>.
      </p>
      <button
        className="btn-secondary"
        onClick={onReset}
      >
        Reset Filters
      </button>
    </div>);
};

export default NoDataMessage;