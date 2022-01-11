import React from 'react';

import styles from './Pagination.module.css';

const Pagination = ({ postPerPage, totalPost, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i < Math.ceil(totalPost / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.paginationPost}>
      <ul className={styles.pagination}>
        {pageNumbers.map((number) => (
          <li
            className={`${styles.pageItem} ${currentPage === number && styles.pageItem__active}`}
            key={number}>
            <a
              href="!#"
              style={currentPage === number ? { color: 'white' } : {}}
              className={styles.pageLink}
              onClick={(e) => paginate(e, number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Pagination;
