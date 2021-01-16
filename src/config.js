import knex from 'knex';

export const client = knex({
  client: 'pg',
  version: '7.2',
  connection: {
    host: 'tuffi.db.elephantsql.com',
    user: 'bgicnmsq',
    password: 'kf7SUvrRux_WgMrvZpDIoI_salIO-Hrf',
    database: 'bgicnmsq'
  }
});