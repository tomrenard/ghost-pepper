import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: `Slicks Slices Tr`,
    siteUrl: 'https://gatsby.pizza',
    description: 'The best pizza place in Berlin!',
    twitter: '@slicksSlices',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'jaop32ft',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      }
    }
  ]
};
