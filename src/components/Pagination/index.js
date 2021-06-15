import React from 'react';
import ReactPaginate from 'react-paginate';
import './index.scss'
function Pagination({ pageCount, handlePageClick }) {
  return (
    <>
      {
        (pageCount > 1) ?
          (
            <nav className="launch-pagination">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />
            </nav>
          ) : (<nav className="launch-pagination"></nav>)
      }

    </>
  )
}

export default Pagination;
