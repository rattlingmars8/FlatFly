export default function Pagination({currentPage, totalPages, onPageChange}) {
  return (
    <div className="pagination flex justify-center items-center gap-4 mb-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="btn-secondary"
      >
        Previous
      </button>
      <span className="text-text text-sm md:text-lg">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="btn-secondary"
      >
        Next
      </button>
    </div>);
}
