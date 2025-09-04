import config from './src/config/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './db/schema.ts',
  out: './src/database-migrations',
  dialect: 'postgresql',
  schemaFilter: ['public', 'auth'],
  dbCredentials: {
    url: config.DATABASE_URL
  },
  verbose: true
});
