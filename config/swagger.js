const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mock Interview API',
      version: '1.0.0',
      description: 'API documentation for AI-based mock interview system',
    },
  },
  apis: [path.join(__dirname, '../routes/routes.js')],
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;