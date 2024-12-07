const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors');
const { connectDB } = require('./config/database');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const vendorRoutes = require('./routes/vendorRoutes');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'YesDay API',
    version: '1.0.0',
    description: 'API to manage wedding events',
  },
  servers: [
    {
      url: 'http://localhost:5000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/**/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1/vendors', vendorRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});