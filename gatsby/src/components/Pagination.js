import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  grid-gap: 1rem;
  text-align: center;
  justify-content: center;
  & > * {
    border: 2px solid lightgray;
    padding: 1rem;
    flex: 1;
    text-decoration: none;
    &[aria-current], &.current {
      color: royalblue;
      font-weight: bolder;
    }
  &[disabled] {
    pointer-events: none;
    opacity: 0.2;
  }
  }
`;

export default function Pagination({ pageSize, totalCount, currentPage, skip, base }) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;
  return (
    <PaginationStyles>
        <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
          &#8592; Prev
        </Link>
        {Array.from({ length: totalPages }).map((_, i) => {
          return (
            <Link className={currentPage === 1 && i === 0 ? 'current' : ''} to={`${base}/${i > 0 ? i + 1 : ''}`}>{i + 1}</Link>
          );
        })}
        <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
          Next &#8594;
        </Link>
    </PaginationStyles>
  );
}
