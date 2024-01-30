/* eslint-disable no-redeclare */
const asyncHandler = require('../../../middlewares/asyncHandler');
const shopify = require('../../../services/Shopify');
const ProductQueries = require('../Queries/Products');
const webParam = require('../../../utils').webParam;

exports.getProductTypes = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Product Types']
  // #swagger.summary = 'Pull list of product types'
  const { first } = req.query;
  const vars = {
    first: webParam(first, 'int'),
  };

  const gqlResponse = await shopify.graphql(ProductQueries.getProductTypes, vars);

  let productTypes = [];
  if (gqlResponse?.productTypes?.edges) {
    for (const { node: productType, cursor } of gqlResponse?.productTypes?.edges || []) {
      productTypes.push({ productType, cursor });
    }
    return res.status(200).json({ success: true, data: productTypes, message: 'All Product Types' });
  } else {
    return res.status(500).json({ success: false, data: null, message: 'Unable to fetch product types' });
  }
});

exports.get = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Products']
  // #swagger.summary = 'Pull paginated list of products'
  const { first, last, before, after, query } = req.query;

  const vars = {
    first: webParam(first, 'int'),
    last: webParam(last, 'int'),
    before: webParam(before, 'string'),
    after: webParam(after, 'string'),
    query: webParam(query, 'string'),
  };

  let products = [];
  const gqlResponse = await shopify.graphql(ProductQueries.getProducts, vars);
  if (gqlResponse?.products?.edges) {
    for (const { node: product, cursor } of gqlResponse?.products?.edges || []) {
      products.push({ ...product, cursor });
    }
    return res.status(200).json({ success: true, data: products, message: 'All Products' });
  } else {
    return res.status(500).json({ success: true, data: null, message: 'Unable to fetch products' });
  }
});

exports.getByHandle = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Products']
  // #swagger.summary = 'Pull product by handle'
  const { handle } = req.params;

  const vars = {
    handle: webParam(handle, 'string'),
  };

  const gqlResponse = await shopify.graphql(ProductQueries.getProductByHandle, vars);

  if (gqlResponse?.productByHandle) {
    return res.status(200).json({ success: true, data: gqlResponse?.productByHandle, message: 'Fetched Product' });
  } else {
    return res.status(500).json({ success: false, data: null, error: 'Unable to fetch product' });
  }
});

exports.getProduct = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Products']
  // #swagger.summary = 'Pull product by {id} or {handle}'
  const { id, handle } = req.query;

  const vars = {
    id: webParam(id, 'string'),
    handle: webParam(handle, 'string'),
  };
  console.log('VARS >>> ', vars);

  const gqlResponse = await shopify.graphql(ProductQueries.getProduct, vars);
  const util = require('util');
  console.log('GQL RESPONSE >> ', util.inspect(gqlResponse, true, null, true /* enable colors */));
  if (gqlResponse?.product) {
    return res.status(200).json({ success: true, data: gqlResponse?.product, message: 'Fetched Product' });
  } else {
    return res.status(500).json({ success: false, data: null, error: 'Unable to fetch product' });
  }
});

exports.productRecommendations = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Products']
  // #swagger.summary = 'Get list or related products'
  const { id } = req.query;

  const vars = {
    productId: webParam(id, 'string'),
  };

  const gqlResponse = await shopify.graphql(ProductQueries.getProductRecommendations, vars);

  if (gqlResponse?.productRecommendations) {
    return res.status(200).json({ success: true, data: gqlResponse?.productRecommendations, message: 'Fetched Related Product' });
  } else {
    return res.status(500).json({ success: false, data: null, error: 'Unable to fetch related product' });
  }
});
