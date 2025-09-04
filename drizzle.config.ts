import config from './src/config/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/database-migrations',
  dialect: 'postgresql',
  schemaFilter: ['public', 'auth'],
  dbCredentials: {
    url: config.DATABASE_URL
  },
  verbose: true
});
