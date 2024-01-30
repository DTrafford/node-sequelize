const express = require('express');
const router = express.Router();

const Checkout = require('./Controller/CheckoutController');
const Collections = require('./Controller/CollectionController');
const Products = require('./Controller/ProductController');
const Blogs = require('./Controller/BlogController');
const Pages = require('./Controller/PageController')


// ? |---| '/pages  routes |---|
/**
 * @route   GET
 * @desc    Get the currently published pages
 * @access  Public
 * @param {int} first number of records to return
 * @param {int} last number of records counting backwards
 * @param {string} before cursor
 * @param {string} after cursor
 * @param {string} query Filter products Ex. tag='Gold'
 */
router.route('/pages').get(Pages.get);

// ? |---| '/pages/:handle  routes |---|
/**
 * @route   GET
 * @desc    Get the currently published products
 * @access  Public
 * @param {string} handle product handle
 */
router.route('/pages/:handle').get(Pages.getByHandle);


// ? |---| '/blogs  routes |---|
/**
 * @route   GET
 * @desc    Get the currently published blogs
 * @access  Public
 * @param {int} first number of records to return
 * @param {int} last number of records counting backwards
 * @param {string} before cursor
 * @param {string} after cursor
 * @param {string} query Filter products Ex. tag='Gold'
 */
router.route('/blogs').get(Blogs.get);

// ? |---| '/blogs/:handle  routes |---|
/**
 * @route   GET
 * @desc    Get blog by handle and paginated articles
 * @access  Public
 * @param {int} first number of article records to return
 * @param {int} last number of article records counting backwards
 * @param {string} before cursor
 * @param {string} after cursor
 * @param {string} query Filter products Ex. tag='Gold'
 * @param {string} handle blog handle
 */
router.route('/blogs/:handle').get(Blogs.getByHandle);

// ? |---| '/product-types |---|
/**
 * @route   GET
 * @desc    Get the currently published products
 * @access  Public
 * @param {int} first number of records to return
 */
router.route('/product-types').get(Products.getProductTypes);

// ? |---| '/products  routes |---|
/**
 * @route   GET
 * @desc    Get the currently published products
 * @access  Public
 * @param {int} first number of records to return
 * @param {int} last number of records counting backwards
 * @param {string} before cursor
 * @param {string} after cursor
 * @param {string} query Filter products Ex. product_type='Urn' or tag='Gold'
 */
router.route('/products').get(Products.get);

// ? |---| '/products/recommendations/:id  routes |---|
/**
 * @route   GET
 * @desc    Get a specific product's related products
 * @access  Public
 * @param {string} id product handle
 */
router.route('/products/recommendations').get(Products.productRecommendations);

// ? |---| '/products/:handle  routes |---|
/**
 * @route   GET
 * @desc    Get the currently published products
 * @access  Public
 * @param {string} handle product handle
 */
router.route('/products/:handle').get(Products.getByHandle);

// ? |---| '/products/id/:id  routes |---|
/**
 * @route   GET
 * @desc    Get the currently published products
 * @access  Public
 * @param {string} id product id
 */
router.route('/product').get(Products.getProduct);

// ? |---| '/collections  routes |---|
/**
 * @route   GET
 * @desc    Get the list of collections
 * @access  Public
 * @param {int} first number of records to return
 * @param {int} last number of records counting backwards
 * @param {string} before cursor
 * @param {string} after cursor
 * @param {string} query Filter products Ex. product_type='Urn'
 */
router.route('/collections').get(Collections.getCollections);

// ? |---| '/collections/:handle  routes |---|
/**
 * @route   GET
 * @desc    Get the collection details by handle
 * @access  Public
 * @param {string} handle collections handle
 */
router.route('/collections/:handle').get(Collections.getCollectionByHandle);

// ? |---| '/checkout  routes |---|
/**
 * @route   POST
 * @desc    Create Shopify Checkout Session
 * @access  Public
 * @param {string} email customer email
 * @param {object} lineItems checkout line items
 * "lineItems": [
      {
        "quantity": 1,
        "variantId": ""
      }
    ],
 * @return {webUrl} Url pointing to created Shopify checkout for redirect
 * 
 */
router.route('/checkout').post(Checkout.checkoutCreate);


module.exports = router;
