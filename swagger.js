const path = require("path");
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "Calculator API",
    description: "Documentation for the Calculator API",
  },
  host: "localhost:3000",
};

const outputFile = path.join(__dirname, "swagger_output.json");
const endpointsFiles = [path.join(__dirname, "app.js")];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./bin/www");
});
