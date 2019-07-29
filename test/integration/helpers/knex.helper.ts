import * as Knex from 'knex'
import { TEST_PG_HOST, TEST_PG_PORT, TEST_PG_USER, TEST_PG_PASSWORD, TEST_PG_DATABASE } from 'test/integration/config'

export const knex: Knex = Knex({
  client: 'pg',
  connection: {
    host: TEST_PG_HOST,
    port: Number(TEST_PG_PORT),
    user: TEST_PG_USER,
    password: TEST_PG_PASSWORD,
    database: TEST_PG_DATABASE
  }
})
