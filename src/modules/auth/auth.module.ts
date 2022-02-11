import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { FindByFieldService } from '../user/services/find-by-field.service';
import { UserModule } from '../user/user.module';
import { AuthController } from '../auth/infra/http/controllers/auth.controller';
import { AuthService } from '../auth/services/auth.service';
import LocalStrategy from './infra/strategies/local.strategy';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import JwtEstrategy from './infra/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    UserModule,
    JwtModule.register({
      privateKey: process.env.JWT_TOKEN_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    FindByFieldService,
    PrismaService,
    JwtEstrategy,
  ],
})
export class AuthModule {}
