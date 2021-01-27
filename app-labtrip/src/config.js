import knex from 'knex';

export const client = knex({
  client: 'pg',
  version: '12',
  connection:{
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    ssl: {
      rejectUnauthorized: false
    }
  }
});