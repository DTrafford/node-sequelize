const gql = require('graphql-request').gql;
const ProductTypes = require('../Types/Products');

const getCollectionByHandle = gql`
  query getCollectionByHandle($handle: String!, $first: Int, $last: Int, $before: String, $after: String) {
    collectionByHandle(handle: $handle) {
      id
      title
      handle
      products(first: $first, last: $last, before: $before, after: $after) {
        edges {
          cursor
          node {
            ${ProductTypes.ProductType}
            variants(first: 10) {
              edges {
                node {
                  ${ProductTypes.VariantType}
                }
              }
            }
          }
        }
      }
    }
  }
`;

const getCollections = gql`
  query getProducts($first: Int, $last: Int, $before: String, $after: String, $query: String) {
    collections(first: $first, last: $last, before: $before, after: $after, query: $query) {
      edges {
        cursor
        node {
          id
          title
          handle
          products(first: 1) {
            edges {
              cursor
              node {
                ${ProductTypes.ProductType}
                variants(first: 10) {
                  edges {
                    node {
                      ${ProductTypes.VariantType}
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

module.exports = {
  getCollectionByHandle,
  getCollections,
};
