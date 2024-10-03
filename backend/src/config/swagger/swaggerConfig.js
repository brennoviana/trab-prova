const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Trab-Prova',
      version: '1.0.0',
      description: 'Api documentation for Trab-Prova',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        UserCreate: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              description: 'User name',
            },
            email: {
              type: 'string',
              description: 'User email',
            },
            password: {
              type: 'string',
              description: 'User password',
            },
          },
        },
        UserUpdate: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'User name',
            },
            email: {
              type: 'string',
              description: 'User email',
            },
          },
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['src/modules/v1/**/routes/userRoutes.js'],
};

export { swaggerOptions };