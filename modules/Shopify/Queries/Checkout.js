const gql = require('graphql-request').gql;

const checkoutCreate = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
      queueToken
    }
  }
`;

module.exports = {
  checkoutCreate,
};
