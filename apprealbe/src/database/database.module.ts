import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import TaskEntity from 'src/tasks/task.entity';
import UserEntity from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DB'),
        entities: [TaskEntity, UserEntity],
        // entities: [
        //   'src/**/*.entity.ts',
        //   'dist/**/*.entity.js',
        //   '../../**/*.entity.{ts,js}',
        // ],
        migrations: ['src/migration/**/*.ts', 'dist/migration/**/*.js'],
        subscribers: ['src/subscriber/**/*.ts', 'dist/subscriber/**/*.js'],
        cli: {
          entitiesDir: 'src',
          migrationsDir: 'src/migration',
          subscribersDir: 'src/subscriber',
        },
        synchronize:
          configService.get('NODE_ENV') === 'development' ? true : false,
      }),
    }),
  ],
})
export class DatabaseModule {}
