import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
import { CommandModule } from 'nestjs-command'

import { DatabaseNamingStrategy } from 'src/db/database-naming.strategy'

import { MainModule } from 'src/modules/main/main.module'

dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
      migrationsRun: false,
      logging: false,
      namingStrategy: new DatabaseNamingStrategy(),
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/**/migrations/*{.js,.ts}`],
    }),
    CommandModule,
    MainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
