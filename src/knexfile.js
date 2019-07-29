const { PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DATABASE } = require('./config')
const { types } = require('pg')

// To get the PostgreSQL Object identifiers run the following query
// SELECT typname, oid, typarray FROM pg_type
const OID_NUMERIC = 1700;
types.setTypeParser(OID_NUMERIC, 'text', parseFloat)

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: PG_HOST,
      port: Number(PG_PORT),
      user: PG_USER,
      password: PG_PASSWORD,
      database: PG_DATABASE
    }
  }
}