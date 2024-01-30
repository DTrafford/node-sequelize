/* eslint-disable no-redeclare */
const asyncHandler = require('../../../middlewares/asyncHandler');
const shopify = require('../../../services/Shopify');
const CollectionQueries = require('../Queries/Collections');
const webParam = require('../../../utils').webParam;

exports.getCollectionByHandle = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Collections']
  // #swagger.summary = 'Pull collection by handle'

  const { first, last, before, after } = req.query;

  const { handle } = req.params;

  const vars = {
    first: webParam(first, 'int'),
    last: webParam(last, 'int'),
    before: webParam(before, 'string'),
    after: webParam(after, 'string'),
    handle: webParam(handle, 'string'),
  };

  const gqlResponse = await shopify.graphql(CollectionQueries.getCollectionByHandle, vars);

  let products = [];
  if (gqlResponse?.collectionByHandle?.products?.edges) {
    for (const { node: product, cursor } of gqlResponse?.collectionByHandle.products?.edges || []) {
      products.push({ ...product, cursor });
    }
    return res.status(200).json({ success: true, data: { ...gqlResponse?.collectionByHandle, products }, message: 'Fetched Product' });
  } else {
    return res.status(500).json({ success: false, data: null, error: 'Unable to fetch product' });
  }
});

exports.getCollections = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Collections']
  // #swagger.summary = 'Get paginated list of all collections'

  const { first, last, before, after, query } = req.query;

  const vars = {
    first: webParam(first, 'int'),
    last: webParam(last, 'int'),
    before: webParam(before, 'string'),
    after: webParam(after, 'string'),
    query: webParam(query, 'string'),
  };

  const gqlResponse = await shopify.graphql(CollectionQueries.getCollections, vars);
  const util = require('util');
  console.log(util.inspect(gqlResponse, true, null, true /* enable colors */));
  return res.status(200).json({ success: true, data: [], message: 'Fetched Product' });
});
