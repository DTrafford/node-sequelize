const gql = require('graphql-request').gql;
const PageTypes = require('../Types/Pages');


const getPages = gql`
    query getPages($first: Int, $last: Int, $before: String, $after: String, $query: String) {
       pages(first: $first, last: $last, before: $before, after: $after, query: $query) {
        edges {
            cursor
                node {
                    ${PageTypes.PageType}
                }
            }     
        }
    }
`;

const getPageByHandle = gql`
    query getPageByHandle($handle: String!) {
        pageByHandle(handle: $handle) {
            ${PageTypes.PageType}
        }
    }
`;


module.exports = {
    getPages,
    getPageByHandle
}