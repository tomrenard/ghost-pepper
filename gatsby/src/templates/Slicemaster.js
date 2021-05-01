import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

const SingleMasterStyles = styled.div`
  display: grid;
  border: 1rem solid red;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 2rem;
  div {
    border: 1rem solid black;
  }
`;

export default function SingleSlicemasterPage({ data: { slicemaster } }) {
  return (
    <>
      <SEO title={`Say Hi to ${slicemaster.name}`} />
      <SingleMasterStyles>
          <Img className="image {slicemaster.name}" fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />
          <div className="content-slice">
            <h2 className='mark'>{slicemaster.name}</h2>
            <p>{slicemaster.description}</p>
          </div>
      </SingleMasterStyles>
    </>
  );
}

export const query = graphql`
  query($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
        name
        description
        image {
          asset {
            fixed(width: 600, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 600) {
              ...GatsbySanityImageFluid
            }
          }
        }
    }
  }
`;
