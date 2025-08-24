import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

export const PaginationComponent = ({ totalPage }) => {
  const [curPage, setCurPage] = useState(1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPage) {
      setCurPage(page);
    }
  };

  // Show current + next 2 pages (max 3 pages in window)
  const pageNumbers = Array.from(
    { length: Math.min(3, totalPage - curPage + 1) },
    (_, i) => curPage + i
  );

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous button */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(curPage - 1);
            }}
            className={curPage === 1 ? "pointer-events-none opacity-40" : ""}
          />
        </PaginationItem>

        {/* Page numbers */}
        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page);
              }}
              isActive={curPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis + Last page */}
        {totalPage > pageNumbers[pageNumbers.length - 1] && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(totalPage);
                }}
                isActive={curPage === totalPage}
              >
                {totalPage}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(curPage + 1);
            }}
            className={
              curPage === totalPage ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
