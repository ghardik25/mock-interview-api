const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();
const interviewRoutes = require('./routes/routes');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use('/interview', interviewRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});