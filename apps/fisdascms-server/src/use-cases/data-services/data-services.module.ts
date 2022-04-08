import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from 'src/frameworks/database/mongodb/mongo-data-service.module';

@Module({
  imports: [MongoDataServicesModule],
  exports: [MongoDataServicesModule],
})
export class DataServicesModule {}
