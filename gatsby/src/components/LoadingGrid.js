import React from 'react';
import { ItemsGrid, SingleGrid } from '../styles/Grids';

export default function LoadingGrid({ count }) {
  return (
    <ItemsGrid>
      {Array.from({ length: count}, (_, i) => (
        <SingleGrid>
          <p>
          <span className='mark'>Loading...</span>
          </p>
          <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8//VPPQAJXANxNy8tAQAAAABJRU5ErkJggg=="
          className="loading"
          alt="Loading"
          width="500"
          height="400"
          />
        </SingleGrid>
      ))}
    </ItemsGrid>
  );
}
