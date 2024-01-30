const asyncHandler = require('../../../middlewares/asyncHandler');
const PageQueries = require('../Queries/Pages');
const webParam = require('../../../utils').webParam;
const shopify = require('../../../services/Shopify');

exports.get = asyncHandler(async (req, res) => {
    // #swagger.tags = ['Pages']
    // #swagger.summary = 'Pull paginated list of published pages'
    
    const { first, last, before, after, query } = req.query;
  
    const vars = {
      first: webParam(first, 'int') || 10,
      last: webParam(last, 'int'),
      before: webParam(before, 'string'),
      after: webParam(after, 'string'),
      query: webParam(query, 'string'),
    };
  
    const gqlResponse = await shopify.graphql(PageQueries.getPages, vars);

    let pages = [];
    if (gqlResponse?.pages?.edges) {
        for (const { node: blog, cursor } of gqlResponse?.pages?.edges || []) {
          pages.push({ ...blog, cursor });
        }
        return res.status(200).json({ success: true, data: pages, message: 'All Pages' });
      } else {
        return res.status(500).json({ success: true, data: null, message: 'Unable to fetch pages' });
      }
  });

  exports.getByHandle = asyncHandler(async (req, res) => {
    // #swagger.tags = ['Pages']
    // #swagger.summary = 'Pull page by handle'

    const { handle } = req.params;
  
    const vars = {
      handle: webParam(handle, 'string'),
    };

    const gqlResponse = await shopify.graphql(PageQueries.getPageByHandle, vars);

    if (gqlResponse?.pageByHandle) {
      return res.status(200).json({ success: true, data: gqlResponse.pageByHandle, message: `${gqlResponse.pageByHandle?.title} Page Fetched` });
    } else {
      return res.status(500).json({ success: true, data: null, message: `Unable to fetch page with {${handle}} handle` });
    }
  });