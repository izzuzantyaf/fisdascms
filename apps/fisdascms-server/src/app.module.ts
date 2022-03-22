import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// import { AdminModule } from './admin/admin.module';
import { AdminModule } from './services/use-cases/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // agar bisa baca file .env
    MongooseModule.forRoot(process.env.MONGO_URI), // agar terhubung ke database (MongoDB)
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
