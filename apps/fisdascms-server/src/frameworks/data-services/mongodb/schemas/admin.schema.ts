import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AdminRole } from 'src/core/entities/admin.entity';
import { Admin as AdminEntity } from 'src/core/entities/admin.entity';

export type AdminDocument = Admin & Document;

@Schema({ timestamps: true })
export class Admin extends AdminEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: AdminRole;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
