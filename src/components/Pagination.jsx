import "./pagination.css";

export default function Pagination({ page, handlePage, totalItems }) {
  const ITEMS_PER_PAGE = 3;
  let totalpages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <div>
      <div className="pg-main">
        <div>
          <p>
            Showing <span>{Math.max(0,(page - 1) * ITEMS_PER_PAGE + 1)}</span> to{" "}
            <span>
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span>{totalItems}</span> results
          </p>
        </div>

        <nav>
          <div className="nav-btn"
            onClick={(e) => {
              page > 1 ? handlePage(page - 1) : handlePage(page);
            }}
          >
            <span>Previous</span>
          </div>
          <div className="indexes">
            {Array.from({ length: totalpages }).map((el, index) => (
              <div className={`index ${index==page-1 ? "active-index":""}`} key={index} onClick={(e) => handlePage(index + 1)}>
                {index + 1}
              </div>
            ))}
          </div>
          <div className="nav-btn"
            onClick={(e) => {
              page != totalpages ? handlePage(page + 1) : handlePage(page);
            }}
          >
            <span>Next</span>
          </div>
        </nav>
      </div>
    </div>
  );
}
