import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  padding: 4rem;
`;

const SingleBeerStyles = styled.div`
  border: 1px solid royalblue;
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 2rem;
  }
`;

export default function BeersPage({ data }) {
  const beers = data.beers.nodes;
  return (
    <>
    <SEO title={`Beeeers! We have ${data.beers.nodes.length} Beers available!`} />
     <h2 className='center'>
      We have {data.beers.nodes.length} Beers available!
     </h2>
     <BeerGridStyles>
       {data.beers.nodes.map(beer => {
        const rating = Math.round(beer.rating.average);
        return (
          <SingleBeerStyles>
          <img src={beer.image} alt={beer.name} />
            <h3>{beer.name}</h3>
            {beer.price}
            <p title={`${rating} out of 5 globos mamen`}>
            {`🔮`.repeat(rating)}
            <span style={{filter: `grayscale(100%)`}}>
              {`🔮`.repeat(5 - rating)}
            </span>
            </p>
          </SingleBeerStyles>
        );
       })}
     </BeerGridStyles>
    </>
  );
}


export const query = graphql`
  query MyQuery {
    beers: allBeer {
      nodes {
        name
        id
        rating {
          average
          reviews
        }
        price
        image
      }
    }
  }
`;
