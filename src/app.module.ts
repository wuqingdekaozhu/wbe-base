import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } from 'src/config';
import { SignatureGuard } from 'src/common/guards/signature.guard';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { User } from 'src/common/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { FallbackModule } from 'src/fallback/fallback.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: MYSQL_HOST,
      port: 3306,
      username: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    FallbackModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: ApiKeyGuard },
    { provide: APP_GUARD, useClass: SignatureGuard },
  ],
})
export class AppModule {}
