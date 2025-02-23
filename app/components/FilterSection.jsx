import CheckIcon from "@/app/components/CheckIcon";
import { flatType } from "@/utils/dataUtils";

const FilterSection = ({ filters, onFilterChange, onSubmit, onReset }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    const updatedDisposition = checked
      ? [...filters.disposition, value]
      : filters.disposition.filter((item) => item !== value);

    onFilterChange({ ...filters, [name]: updatedDisposition });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const handleReset = () => {
    onReset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-primary">
          Price Range
        </label>
        <div className="flex space-x-4">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleInputChange}
            placeholder="Min Price"
            className="w-full p-2 border border-borderGray rounded focus:ring-2 focus:ring-accent"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleInputChange}
            placeholder="Max Price"
            className="w-full p-2 border border-borderGray rounded focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-primary">
          Area Range (sq ft)
        </label>
        <div className="flex space-x-4">
          <input
            type="number"
            name="minArea"
            value={filters.minArea}
            onChange={handleInputChange}
            placeholder="Min Area"
            className="w-full p-2 border border-borderGray rounded focus:ring-2 focus:ring-accent"
          />
          <input
            type="number"
            name="maxArea"
            value={filters.maxArea}
            onChange={handleInputChange}
            placeholder="Max Area"
            className="w-full p-2 border border-borderGray rounded focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-primary">
          Disposition
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {flatType.map((option) => (
            <div key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                id={`disposition-${option}`}
                type="checkbox"
                name="disposition"
                value={option}
                checked={filters.disposition.includes(option)}
                onChange={handleCheckboxChange}
                className="hidden"
              />
              <label
                htmlFor={`disposition-${option}`}
                className={`flex items-center space-x-3 text-sm text-text hover:text-accent hover:cursor-pointer ${
                  filters.disposition.includes(option) ? "text-accent" : ""
                }`}
              >
                <span
                  className={`inline-block w-5 h-5 rounded border border-borderGray relative ${
                    filters.disposition.includes(option) ? "bg-accent border-accent" : ""
                  }`}
                >
                  {filters.disposition.includes(option) && (
                    <CheckIcon className="absolute inset-0 w-full h-full text-white" />
                  )}
                </span>
                <span>{option}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-accent text-white rounded hover:bg-accent-dark"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
};

export default FilterSection;