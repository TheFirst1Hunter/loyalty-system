import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CostumersModule } from './costumers/costumers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      cache: true,
    }),
    AuthModule,
    CostumersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
