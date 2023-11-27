import { ITEMS_PER_PAGE } from "../utility/constants";
import "./pagination.css";

export default function Pagination({ page, handlePage, totalItems }) {

  // number of total pages
  let totalpages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const getPageNumbers = () => {
    const pageNumbers = [];
    const totalPagesToShow = 5; // number of pages to show before and after current page
    const totalPageRange = totalPagesToShow * 2; // number of pages to show in indexes

    if (totalpages <= totalPageRange) {
      // if number of pages are less than the totalPageRange
      for (let i = 1; i <= totalpages; i++) {
        pageNumbers.push(i);
      }
    }
    else {
      // starting and ending pages
      let startPage = Math.max(1, page - totalPagesToShow);
      let endPage = Math.min(totalpages, page + totalPagesToShow);

      if (page <= totalPagesToShow) {
        endPage = totalPageRange;
      } else if (page > totalpages - totalPagesToShow) {
        startPage = totalpages - totalPageRange + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };
  return (
    <div>
      <div className="pg-main">
        <div>
          <p>
            Showing <span>{Math.max(0, (page - 1) * ITEMS_PER_PAGE + 1)}</span>{" "}
            to{" "}
            <span>
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span>{totalItems}</span> results
          </p>
        </div>

        <nav>
          <button
            className="nav-btn"
            onClick={(e) => {
              page > 1 ? handlePage(page - 1) : handlePage(page);
            }}
            disabled={page === 1}
          >
            Previous
          </button>
          <div className="indexes">
            {getPageNumbers().map((pageNumber) => (
              <div
                key={pageNumber}
                onClick={() => handlePage(pageNumber)}
                className={`index ${pageNumber == page ? "active-index" : ""}`}
              >
                {pageNumber}
              </div>
            ))}
          </div>
          <button
            className="nav-btn"
            onClick={(e) => {
              page != totalpages ? handlePage(page + 1) : handlePage(page);
            }}
            disabled={page === totalpages}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}
