import express from 'express';
import cors from 'cors';
import config from './config/config';
import userRoutes from './routes/userRoutes';

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      callback(new Error('No request origin specified'));
    } else if (
      config.NODE_ENV === 'development' ||
      origin.toLowerCase().startsWith(config.AUTHORIZED_CALLER.toLowerCase())
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

app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use('/api/users', userRoutes);

export default app;
