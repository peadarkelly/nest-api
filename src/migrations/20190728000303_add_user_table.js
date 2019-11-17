
exports.up = (knex) => {
  return knex.schema.createTable('user', (table) => {
    table.increments('id')
    table.string('email', 100).notNullable()
    table.string('first_name', 100).notNullable()
    table.string('last_name', 100).notNullable()
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('user')
}
