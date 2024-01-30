const gql = require('graphql-request').gql;
const ProductTypes = require('../Types/Products');

const getProductTypes = gql`
  query getProductTypes($first: Int!) {
    productTypes(first: $first) {
      edges {
        cursor
        node
      }
    }
  }
`;

const getProducts = gql`
  query getProducts($first: Int, $last: Int, $before: String, $after: String, $query: String) {
    products(first: $first, last: $last, before: $before, after: $after, query: $query) {
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
`;

const getProduct = gql`
  query getProduct($id: ID, $handle: String) {
    product(id: $id, handle: $handle) {
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
`;

const getProductByHandle = gql`
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
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
`;

const getProductRecommendations = gql`
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
        ${ProductTypes.ProductType}
    }
  }
`;

module.exports = {
  getProduct,
  getProductByHandle,
  getProducts,
  getProductTypes,
  getProductRecommendations,
};
