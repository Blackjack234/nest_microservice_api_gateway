import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name:'ORDERS_SERVICE',
        transport:Transport.TCP,
        options:{
          host:'localhost',
          port:3001
        }
      },
      {
        name:'AUTH_SERVICE',
        transport:Transport.TCP,
        options:{
          host:'localhost',
          port:3002
        }
      }
    ]),
    JwtModule.register({
      secret:"anirban6526346532643256@@Z%$@#Z%@$%^#$@%$",
      signOptions:{
        expiresIn:'1h'
      }
    }),
    AuthModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
