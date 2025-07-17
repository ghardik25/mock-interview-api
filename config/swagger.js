const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Interview Start',
      version: '1.0.0',
      description: 'Starts an interview session with a unique session ID',
    },
  },
  apis: [path.join(__dirname, '../routes/routes.js')],
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;