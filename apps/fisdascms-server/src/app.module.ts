import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './use-cases/admin/admin.module';
import { AuthModule } from './use-cases/auth/auth.module';
import { HandoutModule } from './use-cases/handout/handout.module';
import { HandoutController } from './controllers/handout/handout.controller';

@Module({
  imports: [
    ConfigModule.forRoot(), // agar bisa baca file .env
    MongooseModule.forRoot(process.env.MONGO_URI), // agar terhubung ke database (MongoDB)
    AdminModule,
    AuthModule,
    HandoutModule,
  ],
  controllers: [HandoutController],
  providers: [],
})
export class AppModule {}
