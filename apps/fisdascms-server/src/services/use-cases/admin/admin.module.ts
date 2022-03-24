import { Module } from '@nestjs/common';
import { AdminController } from 'src/controllers/admin/admin.controller';
import { AdminService } from './admin.service';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { AdminFactoryService } from './admin-factory.service';

@Module({
  imports: [DataServicesModule],
  controllers: [AdminController],
  providers: [AdminService, AdminFactoryService],
  exports: [AdminService, AdminFactoryService],
})
export class AdminModule {}
