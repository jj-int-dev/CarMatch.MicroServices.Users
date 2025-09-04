import { createClient } from '@supabase/supabase-js';
import config from '../config/config';

export const supabase = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_PUBLISHABLE_KEY
);
