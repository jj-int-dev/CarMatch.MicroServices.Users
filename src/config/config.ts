import dotenv from 'dotenv';

dotenv.config();

interface Config {
  PORT: number;
  NODE_ENV: string;
  SUPABASE_URL: string;
  SUPABASE_PUBLISHABLE_KEY: string;
  DATABASE_URL: string;
}

const config: Config = {
  PORT: Number(process.env.PORT!),
  NODE_ENV: process.env.NODE_ENV!,
  SUPABASE_URL: process.env.SUPABASE_URL!,
  SUPABASE_PUBLISHABLE_KEY: process.env.SUPABASE_PUBLISHABLE_KEY!,
  DATABASE_URL: process.env.DATABASE_URL!
};

export default config;
