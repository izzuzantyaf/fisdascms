import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminFactoryService } from './admin-factory.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AdminFactoryService],
  exports: [AdminService, AdminFactoryService],
})
export class AdminModule {}
