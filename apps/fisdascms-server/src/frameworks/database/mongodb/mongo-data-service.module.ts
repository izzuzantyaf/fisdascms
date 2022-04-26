import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IDataServices } from 'src/entities/abstracts/data-services.abstract';
import { MongoDataServices } from './mongo-data-service.service';
import { Admin, AdminSchema } from 'src/entities/models/admin.entity';
import { Handout, HandoutSchema } from 'src/entities/models/handout.entity';
import {
  CodeOfConduct,
  CodeOfConductSchema,
} from 'src/entities/models/code-of-conduct.entity';
import {
  Organigram,
  OrganigramSchema,
} from 'src/entities/models/organigram.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: Handout.name, schema: HandoutSchema },
      { name: CodeOfConduct.name, schema: CodeOfConductSchema },
      { name: Organigram.name, schema: OrganigramSchema },
    ]),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}
