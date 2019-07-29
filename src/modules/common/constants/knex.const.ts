import * as Knex from 'knex'
import { development } from 'src/knexfile'

export const knex: Knex = Knex(development)
