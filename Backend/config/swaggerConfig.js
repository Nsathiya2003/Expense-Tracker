// config/swaggerConfig.js

import swaggerJSDoc from 'swagger-jsdoc';

// Define Swagger options
const options = {
  definition: {
    openapi: "3.0.0", // Using OpenAPI 3.0
    info: {
      title: "Expense Tracker API", // API title
      version: "1.0.0", // API version
      description: "API documentation for Expense Tracker",
    },
    servers: [
      {
        url: "http://localhost:5000/api", // Base URL of your API
      },
    ],
  },
  apis: ["./routes/*.js", "./controllers/*.js"], // Path to your routes/controllers files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
