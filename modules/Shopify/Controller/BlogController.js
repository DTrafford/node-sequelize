const asyncHandler = require('../../../middlewares/asyncHandler');
const BlogQueries = require('../Queries/Blogs');
const webParam = require('../../../utils').webParam;
const shopify = require('../../../services/Shopify');

exports.get = asyncHandler(async (req, res) => {
    // #swagger.tags = ['Blogs']
    // #swagger.summary = 'Pull paginated list of blogs and articles'
    
    const { first, last, before, after, query } = req.query;
  
    const vars = {
      first: webParam(first, 'int') || 10,
      last: webParam(last, 'int'),
      before: webParam(before, 'string'),
      after: webParam(after, 'string'),
      query: webParam(query, 'string'),
    };
  
    const gqlResponse = await shopify.graphql(BlogQueries.getBlogs, vars);

    let blogs = [];
    if (gqlResponse?.blogs?.edges) {
        for (const { node: blog, cursor } of gqlResponse?.blogs?.edges || []) {
          blogs.push({ ...blog, cursor });
        }
        return res.status(200).json({ success: true, data: blogs, message: 'All Blogs' });
      } else {
        return res.status(500).json({ success: true, data: null, message: 'Unable to fetch blogs' });
      }
  });

  exports.getByHandle = asyncHandler(async (req, res) => {
    // #swagger.tags = ['Blogs']
    // #swagger.summary = 'Pull blog by handle with paginated articles'

    const { first, last, before, after, query } = req.query;
    const { handle } = req.params;
  
    const vars = {
      first: webParam(first, 'int') || 10,
      last: webParam(last, 'int'),
      before: webParam(before, 'string'),
      after: webParam(after, 'string'),
      query: webParam(query, 'string'),
      handle: webParam(handle, 'string'),
    };

    const gqlResponse = await shopify.graphql(BlogQueries.getBlogPosts, vars);

    let blog = {};
    let articles = [];
    if (gqlResponse?.blogByHandle) {
      for (const { node: article, cursor } of gqlResponse?.blogByHandle?.articles?.edges || []) {
       articles.push({ ...article, cursor });
      }
      blog = {...gqlResponse.blogByHandle, articles};
      return res.status(200).json({ success: true, data: blog, message: 'All Blogs' });
    } else {
      return res.status(500).json({ success: true, data: null, message: 'Unable to fetch blogs' });
    }
  });