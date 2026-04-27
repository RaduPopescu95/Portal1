"use client";

import React from "react";

const Pagination = ({
  currentPage = 1,
  totalPages = 3,
  setCurrentPage = () => {},
}) => {
  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="page_navigation">
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button
          aria-label="page back"
          className="page-link"
          onClick={(e) => handleClick(currentPage - 1, e)}
          disabled={currentPage === 1}
        >
          <span className="flaticon-left-arrow"></span>
        </button>
      </li>
      {pageNumbers.map((number) => (
        <li
          key={number}
          className={`page-item ${number === currentPage ? "active" : ""}`}
        >
          <button
            type="button"
            className="page-link"
            onClick={() => handleClick(number)}
          >
            {number}
          </button>
        </li>
      ))}
      <li
        className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
      >
        <button
          aria-label="page forward"
          className="page-link"
          onClick={(e) => handleClick(currentPage + 1, e)}
          disabled={currentPage === totalPages}
        >
          <span className="flaticon-right-arrow"></span>
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
