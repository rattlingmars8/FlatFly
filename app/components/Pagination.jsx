import Skeleton from "react-loading-skeleton";

export default function Pagination({currentPage, totalPages, onPageChange, loading}) {
  return (
    <div className="pagination flex justify-center items-center gap-4 mb-6">
      {loading ? (
        <Skeleton count={1} className="min-w-[110px] px-4 py-2"/>
      ):(
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="btn-secondary"
        >
          Previous
        </button>

      )}
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
