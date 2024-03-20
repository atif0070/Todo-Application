const swaggerJSDoc = require("swagger-jsdoc");
const YAML = require("yamljs");
const apiSpec = YAML.load("api.yaml"); // Load YAML content

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: apiSpec.info.title, // Use title from YAML
      description: apiSpec.info.description, // Use description from YAML
      version: apiSpec.info.version, // Use version from YAML
    },

    servers: apiSpec.servers, // Use servers from YAML
    paths: apiSpec.paths,
    components: apiSpec.components,
  },
  apis: ["./server.js", "./routes/**/*.js"],
};

module.exports = swaggerJSDoc(options);
