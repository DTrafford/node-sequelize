const GenericTypes = require('./Generic');

const PageType = `
    id
    handle
    title
    body
    bodySummary
    seo {
        ${GenericTypes.SeoType}
    }
`;

module.exports = {
    PageType,
}