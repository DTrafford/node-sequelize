const GraphQLClient = require('graphql-request').GraphQLClient;

const shopify = (accessToken, shopName) => {
  const shopifyGraphQLEndpoint = `https://${process.env.SHOPIFY_SHOP_NAME}.myshopify.com/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`;
  class ShopifyService {
    constructor() {
      this._accessToken = process.env.SHOPIFY_STORE_TOKEN;
      this._client = new GraphQLClient(shopifyGraphQLEndpoint);
    }

    async graphql(query, vars = {}) {
      const headers = {
        'X-Shopify-Storefront-Access-Token': this._accessToken,
      };
      return await this._client.request(query, vars, headers);
    }
  }

  return new ShopifyService(accessToken, shopName);
};

module.exports = shopify();
