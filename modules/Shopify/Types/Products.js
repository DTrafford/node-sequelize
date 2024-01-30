const MediaTypes = require('./Media');
const GenericTypes = require('./Generic');


const ProductType = `
    id
    title
    handle
    productType
    description
    descriptionHtml
    totalInventory
    vendor
    seo {
      ${GenericTypes.SeoType}
    }
    tags
    featuredImage {
      ${MediaTypes.ImageType}
    }
    compareAtPriceRange {
      maxVariantPrice {
        ${GenericTypes.MoneyType}
      }
      minVariantPrice {
        ${GenericTypes.MoneyType}
      }
    }
`;

const VariantType = `
    id
    title
    quantityAvailable
    sku
    weight
    weightUnit
    selectedOptions {
      name
      value
    }
    price {
      ${GenericTypes.MoneyType}
    }
    compareAtPrice {
      ${GenericTypes.MoneyType}
    }
`;


module.exports = {
  ProductType,
  VariantType,
};
