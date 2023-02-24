import { Pool, PoolClient, PoolConfig } from 'pg';
import { env } from 'process';
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({
    encoding: 'utf8',
    path: resolve(process.cwd(), '.env'),
});

const poolConfig: PoolConfig = {
    host: env.DB_HOST,
    port: +(env.DB_PORT || 10033),
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DATABASE,
    idleTimeoutMillis: 5000,
    max: 1000, // As node-postgres it self use 10 max connections, so to provide unlimited connections, it is being set to 1000
    connectionTimeoutMillis: 10000,
};

const pool: Pool = new Pool(poolConfig);

pool.on('error', (err: Error) => {
    console.error(err);
});

export const initializeConnection = async (): Promise<Pool> => {
    console.log(`New db connection is established!!`);
    return pool;
};

export const releaseConnection = async (client: PoolClient) => {
    console.log(`Connection release is : ${await client.release(true)}`);
};