import { join } from 'path'

import { configDotenv } from 'dotenv'
import { DataSource } from 'typeorm'

import { DatabaseNamingStrategy } from './database-naming.strategy'

configDotenv()

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  namingStrategy: new DatabaseNamingStrategy(),
  migrations: [join(__dirname, '../**/migrations/*{.js,.ts}')],
  entities: [join(__dirname, '../**/*entity{.ts,.js}')],
})
