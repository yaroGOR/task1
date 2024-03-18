import { configDotenv } from 'dotenv'
import { DataSource } from 'typeorm'

import { DatabaseNamingStrategy } from 'src/db/database-naming.strategy'

configDotenv()

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  namingStrategy: new DatabaseNamingStrategy(),
  migrations: [`${__dirname}/../**/migrations/*{.js,.ts}`],
  entities: [`${__dirname}/../**/*.entity{.js,.ts}`],
})
