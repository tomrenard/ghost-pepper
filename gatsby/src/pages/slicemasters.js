import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const SliceMastersGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  border: 1rem solid red;
`;

const SingleSliceMasterGridStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  border: 1rem solid lightgreen;
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
`;

function SingleSlicemaster({ slicemaster }) {
  return (
    <SingleSliceMasterGridStyles>
      <Link to={`/slicemaster/${slicemaster.slug.current}`}>
        <h2 className="mark">{slicemaster.name}</h2>
        <Img className="image {slicemaster.name}"
        fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />
        <p>{slicemaster.description}</p>
      </Link>
    </SingleSliceMasterGridStyles>
  );
}

export default function SliceMastersPage({ data, pageContext }) {
  const slicemasters = data.slicemasters.nodes;
  return (
    <>
    <SEO title={`Slicemasters - Page ${pageContext.curentPage || 1}`} />
    <Pagination pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)} totalCount={data.slicemasters.totalCount}
    currentPage={pageContext.currentPage || 1} skip={pageContext.skip} base="/slicemasters" />
    <SliceMastersGridStyles>
       {slicemasters.map(slicemaster => {
        return (
          <SingleSlicemaster key={slicemaster.name}
          slicemaster={slicemaster} />
        );
       })}
    </SliceMastersGridStyles>
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        name
        slug {
          current
        }
        description
        image {
          asset {
            fixed(width: 600, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
