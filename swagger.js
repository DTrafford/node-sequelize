/* eslint-disable no-console */
require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')({ openapi: "3.0.2" })
const fs = require('fs');

const outputFile = './swagger_output.json'
const endpointsFiles = []

const doc = {
    info: {
      version: '',      // by default: '1.0.0'
      title: 'Eirene - Node',        // by default: 'REST API'
      description: 'Node backend for Eirene',  // by default: ''
    },
    host: 'localhost:5001',      // by default: 'localhost:3000'
    basePath: '/api/v1',  // by default: '/'
    schemes: [],   // by default: ['http']
    consumes: [],  // by default: ['application/json']
    produces: [],  // by default: ['application/json']
    tags: [        // by default: empty Array
    ],
    securityDefinitions: {},  // by default: empty object
    definitions: {},          // by default: empty object (Swagger 2.0)
    components: {}            // by default: empty object (OpenAPI 3.x)
  };


let files = fs.readdirSync('src/modules');
for (let i in files) {
  if (fs.existsSync(`src/modules/${files[i]}/route.js`)) {
    endpointsFiles.push(`./modules/${files[i]}/route`);
  }
}

swaggerAutogen(outputFile, endpointsFiles, doc);