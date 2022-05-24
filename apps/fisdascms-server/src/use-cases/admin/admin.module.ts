import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DataServiceModule } from 'src/database/data-service.module';
import { AdminFactoryService } from './admin-factory.service';

@Module({
  imports: [DataServiceModule],
  controllers: [AdminController],
  providers: [AdminService, AdminFactoryService],
  exports: [AdminService, AdminFactoryService],
})
export class AdminModule {}
