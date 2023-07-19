import { GoogleStrategy } from './google.strategy';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { BasePermissionModule } from './base-permission/base-permission.module';
import { BasePermission } from './base-permission/base-permission.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, BasePermission]),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_CONNECTION_STRING,
      database: process.env.MONGODB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: true,
      useNewUrlParser: true,
      synchronize: true,
      logging: true,
      autoLoadEntities: true
    }),
    AuthModule,
    UserModule,
    BasePermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
