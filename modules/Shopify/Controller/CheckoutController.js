/* eslint-disable no-redeclare */
const asyncHandler = require('../../../middlewares/asyncHandler');
const shopify = require('../../../services/Shopify');
const CheckoutQueries = require('../Queries/Checkout');
const webParam = require('../../../utils').webParam;

exports.checkoutCreate = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Checkout']
  // #swagger.summary = 'Create a shopify checkout url'

  const { email, lineItems } = req.body;

  if (!lineItems) {
    return res.status(400).json({ success: false, data: null, error: 'No checkout lines found' });
  }
  const vars = {
    input: {
      email: webParam(email, 'string'),
      lineItems,
    },
  };

  const gqlResponse = await shopify.graphql(CheckoutQueries.checkoutCreate, vars);

  if (gqlResponse?.checkoutCreate?.checkout) {
    return res.status(200).json({ success: true, data: gqlResponse?.checkoutCreate?.checkout, message: 'Checkout Created' });
  } else {
    return res.status(500).json({ success: false, data: null, error: 'Unable to create checkout' });
  }
});
