import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Language } from '../constants/constants';

export type PracticumModuleDocument = PracticumModule & Document;

@Schema({ timestamps: true, collection: 'practicum_modules' })
export class PracticumModule {
  _id: string | number;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  code: string;
  @Prop({ required: true })
  language: Language;
  @Prop({ required: true })
  faIconName: string;
  @Prop()
  preTask: {
    url: string;
    isActive: boolean;
  };
  @Prop()
  video: {
    url: string;
    isActive: boolean;
  };
  @Prop()
  simulator: {
    url: string;
    isActive: boolean;
  };
  @Prop()
  journalCover: {
    url: string;
    isActive: boolean;
  };
}

export const PracticumModuleSchema =
  SchemaFactory.createForClass(PracticumModule);
