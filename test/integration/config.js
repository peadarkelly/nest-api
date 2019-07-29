module.exports = {
  TEST_PG_HOST: process.env.TEST_PG_HOST || 'localhost',
  TEST_PG_DATABASE: process.env.TEST_PG_DATABASE || 'nest',
  TEST_PG_USER: process.env.TEST_PG_USER || 'docker',
  TEST_PG_PASSWORD: process.env.TEST_PG_PASSWORD || 'docker',
  TEST_PG_PORT: process.env.TEST_PG_PORT || 5432
}
