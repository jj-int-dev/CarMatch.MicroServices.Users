import type { Options } from 'swagger-jsdoc';
import config from './config';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Users API',
      version: '1.0.0',
      description: 'API documentation for the Cat Match Users microservice'
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
        description: 'Development server'
      }
    ]
  },
  apis: ['../routes/*.ts'] // Paths to your JSDoc-commented TypeScript files
};

export default swaggerOptions;
