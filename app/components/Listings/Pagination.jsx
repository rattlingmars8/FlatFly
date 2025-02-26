import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

export default function Pagination({
  currentPage,
  totalPages,
  queryParams,
  loading,
}) {
  const buildLink = (newPage) => {
    const params = new URLSearchParams(queryParams);
    params.set("page", newPage);
    return `/?${params.toString()}`;
  };

  if (loading) {
    return (
      <div className="pagination flex justify-center items-center gap-2 mb-6">
        <Skeleton width={80} height={40} className="!rounded" />
        <Skeleton width={50} height={40} className="!rounded" />
        <Skeleton width={80} height={40} className="!rounded" />
      </div>
    );
  }

  if (totalPages === 0) return null;

  let pageButtons;
  if (currentPage === totalPages) {
    pageButtons = [currentPage];
  } else {
    pageButtons = [currentPage, currentPage + 1];
    if (currentPage + 1 < totalPages) {
      pageButtons.push("ellipsis", totalPages);
    }
  }

  return (
    <div className="pagination flex justify-center items-center gap-2 mb-6">
      {currentPage > 1 && (
        <Link
          href={buildLink(currentPage - 1)}
          className="text-primary hover:text-secondary"
        >
          <CiCircleChevLeft className="w-[40px] h-[40px]" />
        </Link>
      )}
      {pageButtons.map((page, idx) =>
        page === "ellipsis" ? (
          <span key={idx} className="px-3 py-2">
            ...
          </span>
        ) : (
          <Link
            key={idx}
            href={buildLink(page)}
            className={`btn-secondary__nav-link px-3 py-2 ${
              page === currentPage ? "!bg-primary !text-white" : ""
            }`}
          >
            {page}
          </Link>
        ),
      )}
      {currentPage < totalPages && (
        <Link
          href={buildLink(currentPage + 1)}
          className="text-primary hover:text-secondary"
        >
          <CiCircleChevRight className="w-[40px] h-[40px]" />
        </Link>
      )}
    </div>
  );
}
