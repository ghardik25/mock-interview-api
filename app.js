const express = require('express');
const app = express();
const interviewRoutes = require('./routes/routes');

app.use(express.json());
app.use('/interview', interviewRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});