const gql = require('graphql-request').gql;
const BlogTypes = require('../Types/Blogs');

const getBlogs = gql`
    query getBlogs($first: Int) {
       blogs(first: $first) {
            edges {
                cursor
                node {
                    ${BlogTypes.BlogType}
                }
            }
        }
    }
`;

const getBlogPosts = gql`
    query getBlogPosts($handle: String!, $first: Int, $last: Int, $before: String, $after: String, $query: String) {
       blogByHandle(handle: $handle) {
            ${BlogTypes.BlogType}
            articles(first: $first, last: $last, before: $before, after: $after, query: $query) {
                edges {
                    node {
                        ${BlogTypes.ArticleType}
                    }
                }
            }
        }
    }
`;


module.exports = {
    getBlogs,
    getBlogPosts
}