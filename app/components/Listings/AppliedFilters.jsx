import { formatNumber } from "@/utils/dataUtils.js";

const AppliedFilters = ({ filters }) => {
  const { minPrice, maxPrice, minArea, maxArea, disposition } = filters;
  const hasFilters =
    minPrice ||
    maxPrice ||
    minArea ||
    maxArea ||
    (disposition && disposition.length);

  if (!hasFilters) return null;

  return (
    <>
      <hr className="my-4 border-gray-300" />
      <div className="bg-purpleShades/40 mb-6 p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-700 mb-2">
          Applied Filters:
        </h3>
        <ul className="list-disc ml-5 text-gray-700">
          {minPrice && <li>Min Price: {formatNumber(minPrice)}</li>}
          {maxPrice && <li>Max Price: {formatNumber(maxPrice)}</li>}
          {minArea && <li>Min Area: {minArea}</li>}
          {maxArea && <li>Max Area: {maxArea}</li>}
          {disposition && disposition.length > 0 && (
            <li>Disposition: {disposition.join(", ")}</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default AppliedFilters;
