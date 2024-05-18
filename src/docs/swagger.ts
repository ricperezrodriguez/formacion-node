import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Documentación API del curso de NODE",
    description: "API endpoints de ciudades y lugares de la formación de NODE",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local server",
    },
    {
      url: "<your live url here>",
      description: "Live server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      city: {
        type: "object",
        required: ["name", "country", "coordinates", "img"],
        properties: {
          name: {
            type: "string",
          },
          country: {
            type: "string",
          },
          coordinates: {
            type: "number[]",
          },
          img: {
            type: "string",
          },
          description: {
            type: "string",
          },
        },
      },
      place: {
        type: "object",
        required: ["name", "country", "coordinates", "img"],
        properties: {
          name: {
            type: "string",
          },
          country: {
            type: "string",
          },
          coordinates: {
            type: "number[]",
          },
          img: {
            type: "string",
          },
          description: {
            type: "string",
          },
        },
      },
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/presentation/**/routes.ts"],
};

export default swaggerJSDoc(swaggerOptions);
