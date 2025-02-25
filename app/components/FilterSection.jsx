import CheckIcon from "./CheckIcon";
import { flatType, formatNumber } from "@/utils/dataUtils";
import { ClipLoader } from "react-spinners";

const FilterSection = ({
  filters,
  onFilterChange,
  onSubmit,
  onReset,
  loading,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, ""); // Видаляємо все, окрім цифр
    onFilterChange({ ...filters, [name]: numericValue });
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-primary">
          Price Range
        </label>
        <div className="flex space-x-4">
          <input
            type="text"
            name="minPrice"
            value={formatNumber(filters.minPrice)}
            onChange={handleInputChange}
            placeholder="Min Price"
            className="inputs"
          />
          <input
            type="text"
            name="maxPrice"
            value={formatNumber(filters.maxPrice)}
            onChange={handleInputChange}
            placeholder="Max Price"
            className="inputs"
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-primary">
          Area Range (m²)
        </label>
        <div className="flex space-x-4">
          <input
            type="text"
            name="minArea"
            value={formatNumber(filters.minArea)}
            onChange={handleInputChange}
            placeholder="Min Area"
            className="inputs"
          />
          <input
            type="text"
            name="maxArea"
            value={formatNumber(filters.maxArea)}
            onChange={handleInputChange}
            placeholder="Max Area"
            className="inputs"
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-primary">
          Disposition
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {flatType.map((option) => (
            <div
              key={option}
              className="flex items-center space-x-3 cursor-pointer"
            >
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
                className={`flex items-center space-x-3 text-sm text-text hover:text-primary hover:cursor-pointer ${
                  filters.disposition.includes(option) ? "text-primary" : ""
                }`}
              >
                <span
                  className={`inline-block w-5 h-5 rounded border border-borderGray relative ${
                    filters.disposition.includes(option)
                      ? "bg-primary border-primary"
                      : ""
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
          onClick={onReset}
          className="btn-secondary flex items-center justify-center w-24"
          disabled={loading}
        >
          {loading ? <ClipLoader size={24} color="primary" /> : "Reset"}
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary flex items-center justify-center transition w-32"
          disabled={loading}
        >
          {loading ? <ClipLoader size={24} color="#fff" /> : "Apply Filters"}
        </button>
      </div>
    </form>
  );
};

export default FilterSection;
