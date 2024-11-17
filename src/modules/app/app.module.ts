import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../../database/database.module';
import { LoggerMiddleware } from '../../common/utils/logger';
import { CustomConfigModule } from '../config/config.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
      ignoreEnvFile: false,
    }),
    // ClientsModule.register([
    //   {
    //     name: 'NEARBY_SERVICE',
    //     transport: Transport.TCP,
    //     options: {
    //       host: 'localhost',
    //       port: 8000,
    //     },
    //   },
    DatabaseModule,
    CustomConfigModule,
    AppModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
