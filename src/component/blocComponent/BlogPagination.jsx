import React from 'react';
import '../cssComponent/blogCss/BlogPagination.css';

function getPages(current, total, windowSize = 3) {
  const DOTS = '...';
  if (total <= windowSize + 2) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = [];
  const left = Math.max(2, current - Math.floor(windowSize / 2));
  const right = Math.min(total - 1, current + Math.floor(windowSize / 2));

  if (left > 2) {
    pages.push(1, DOTS);
  } else {
    for (let i = 1; i < left; i++) pages.push(i);
  }

  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < total - 1) {
    pages.push(DOTS, total);
  } else {
    for (let i = right + 1; i <= total; i++) pages.push(i);
  }
  return pages;
}

const BlogPagination = ({ current, total, onPageChange }) => {
  const windowSize = 3;
  const pages = getPages(current, total, windowSize);
  return (
    <div className="pagination">
      <button disabled={current === 1} onClick={() => onPageChange(current - 1)}>&lt;</button>
      {pages.map((page, idx) => {
        if (page === '...') {
          const prev = pages[idx - 1];
          const next = pages[idx + 1];
          let jumpTo = 1;
          if (prev === 1) {
            jumpTo = next - windowSize;
            if (jumpTo < 1) jumpTo = 1;
          } else {
            jumpTo = prev + windowSize;
            if (jumpTo > total) jumpTo = total;
          }
          return (
            <span
              key={`ellipsis-${idx}`}
              className="pagination-ellipsis clickable"
              onClick={() => onPageChange(jumpTo)}
              style={{ cursor: 'pointer' }}
            >
              ...
            </span>
          );
        }
        return (
          <button
            key={page}
            className={current === page ? 'active' : ''}
            onClick={() => onPageChange(page)}
            disabled={page === current}
          >
            {page}
          </button>
        );
      })}
      <button disabled={current === total} onClick={() => onPageChange(current + 1)}>&gt;</button>
    </div>
  );
};

export default BlogPagination; 