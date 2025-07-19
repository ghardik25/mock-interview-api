const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();
require('dotenv').config();
const interviewRoutes = require('./routes/routes');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use('/interview', interviewRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000 \nSwagger UI is available at: http://localhost:3000/api-docs');
});