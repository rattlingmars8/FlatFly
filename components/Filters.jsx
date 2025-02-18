const Filters = ({filters, onApplyFilters, onFilterChange}) => {
    return (
        <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg shadow text-black">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="mb-2">
                <label className="block text-sm">Min Price</label>
                <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={onFilterChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm">Max Price</label>
                <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={onFilterChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm">Min Area (m²)</label>
                <input
                    type="number"
                    name="minArea"
                    value={filters.minArea}
                    onChange={onFilterChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm">Max Area (m²)</label>
                <input
                    type="number"
                    name="maxArea"
                    value={filters.maxArea}
                    onChange={onFilterChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <button onClick={onApplyFilters} className="mt-2 w-full bg-blue-500 text-white p-2 rounded">
                Apply Filters
            </button>
        </div>
    );
};

export default Filters;
