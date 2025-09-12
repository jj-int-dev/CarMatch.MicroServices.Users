import express from 'express';
import cors from 'cors';
import config from './config/config';
import userRoutes from './routes/userRoutes';
import swaggerOptions from './config/swaggerOptions';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (
      config.NODE_ENV === 'development' ||
      origin?.toLowerCase().startsWith(config.AUTHORIZED_CALLER.toLowerCase())
    ) {
      callback(null, origin);
    } else {
      callback(new Error('Request from unauthorized origin'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true // Allow sending cookies/authorization headers
};

const app = express();
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(express.json());
app.use(cors(corsOptions));
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

// Routes
app.use('/api/users', userRoutes);

export default app;
