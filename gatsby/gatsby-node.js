import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnSliceMastersIntoPages({ graphql, actions }) {
  const sliceMastersTemplate = path.resolve('./src/templates/Slicemaster.js');
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          description
          slug {
            current
          }
        }
      }
    }
  `);
  data.slicemasters.nodes.forEach(slicemaster => {
    actions.createPage({
      path: `slicemaster/${slicemaster.slug.current}`,
      component: sliceMastersTemplate,
      context: {
        slug: slicemaster.slug.current,
      }
    })
  });
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  Array.from({length: pageCount}).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i+1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      }
    });

  } )
}

async function turnPizzasIntoPages({ graphql, actions }) {
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  data.pizzas.nodes.forEach(pizza => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      }
    })
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  data.toppings.nodes.forEach(topping => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`
      }
    })
  });
}

async function fetchBeersAndTurnIntoNodes({ actions, createNodeId, createContentDigest }) {
  const res = await fetch('https://api.sampleapis.com/beers/ale')
  const beers = await res.json();
  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      }
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

export async function sourceNodes(params) {
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  await Promise.all([turnPizzasIntoPages(params),
    turnToppingsIntoPages(params), turnSliceMastersIntoPages(params)]);
}

