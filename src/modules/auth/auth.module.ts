import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/database/database.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { OtpRepository } from './otp.repository';
import { UserRepository } from '../user/user.repository';
import { VerifyToken } from 'src/common/middlewares/verify-token.middleware';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("OTP_TOKEN_SECRET"),
      }),
      inject: [ConfigService],
      global: true,
    }),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    PrismaService,
    TokenService,
    OtpRepository,
    UserRepository,
  ],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    // FIXME apply VerifyToken middleware and VerifyAgentToken middleware
    consumer.apply(VerifyToken).forRoutes('*');
  }
}
