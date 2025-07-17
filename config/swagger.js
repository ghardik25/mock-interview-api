const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Interview Start',
      version: '1.0.0',
      //description: 'Starts a interview session with a uniques session id',
    },
  },
  apis: ['../routes/routes.js'], // Path to the API routes
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;