import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
import { CommandModule } from 'nestjs-command'
import { LoggerModule } from 'nestjs-pino'

import { loggerOptions } from 'src/logger.config'

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
    ScheduleModule.forRoot(),
    LoggerModule.forRoot(loggerOptions),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
