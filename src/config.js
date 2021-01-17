import knex from 'knex';

export const client = knex({
  client: 'pg',
  version: '7.2',
  connection: process.env.DATABASE_URL
});