module.exports = {
  PORT: process.env.PORT || 3001,
  PG_HOST: process.env.PG_HOST || 'localhost',
  PG_DATABASE: process.env.PG_DATABASE || 'nest',
  PG_USER: process.env.PG_USER || 'docker',
  PG_PASSWORD: process.env.PG_PASSWORD || 'docker',
  PG_PORT: process.env.PG_PORT || 5432
}
