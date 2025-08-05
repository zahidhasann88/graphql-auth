import dotenv from 'dotenv';
dotenv.config();
import { Pool } from 'pg';
import logger from '../utils/logger';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD || ''),
  port: parseInt(process.env.DB_PORT || '5432'),
});

pool.on('error', (err) => {
  logger.error('❌ Database error:', err);
});

export default pool;