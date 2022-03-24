import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './services/use-cases/admin/admin.module';
import { AuthModule } from './services/use-cases/auth/auth.module';
import { AuthController } from './controllers/auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot(), // agar bisa baca file .env
    MongooseModule.forRoot(process.env.MONGO_URI), // agar terhubung ke database (MongoDB)
    AdminModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
