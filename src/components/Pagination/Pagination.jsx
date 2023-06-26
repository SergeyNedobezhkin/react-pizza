import React from "react";
import ReactPaginate from "react-paginate";
import paginate from "./Pagination.module.scss";

function Pagination({ onPageChange, pizzasPerPage }) {
  return (
    <ReactPaginate
      className={paginate.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onPageChange(event.selected + 1)}
      pageRangeDisplayed={pizzasPerPage}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
