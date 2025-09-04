import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import config from '../config/config';

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(config.DATABASE_URL, { prepare: false });
export const db = drizzle(client);
