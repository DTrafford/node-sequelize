const GenericTypes = require('./Generic');
const MediaTypes = require('./Media')

const ArticleType = `
    id
    handle
    content
    contentHtml
    excerpt
    excerptHtml
    image {
        ${MediaTypes.ImageType}
    }
    seo {
        ${GenericTypes.SeoType}
    }
    tags
`;

const BlogType = `
    id
    handle
    authors {
        bio
        email
        name   
    }
    seo {
        ${GenericTypes.SeoType}
    }
`;

module.exports = {
    BlogType,
    ArticleType
}