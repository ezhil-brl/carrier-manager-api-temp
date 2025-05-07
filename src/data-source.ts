import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.SUPABASE_DB_HOST,
  port: process.env.SUPABASE_DB_PORT
    ? parseInt(process.env.SUPABASE_DB_PORT)
    : 5432,
  username: process.env.SUPABASE_DB_USER,
  password: process.env.SUPABASE_DB_PASSWORD,
  database: process.env.SUPABASE_DB_NAME,
  // entities: [],
  autoLoadEntities: true,
  synchronize: process.env.NODE_ENV !== 'production',
  logging: true,
  // Pool configuration
  extra: {
    // This is where you can specify the pool_mode as 'session'
    poolMode: 'session',
    max: 20, // maximum number of clients the pool should contain
    idleTimeoutMillis: 60000, // how long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 20000, // maximum time to wait for a connection
  },
};
