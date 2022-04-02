import { Prop, Schema } from '@nestjs/mongoose';
import { Faculty, Language } from '../constants/constants';

@Schema({ timestamps: true })
export class Handout {
  _id: string | number;
  @Prop({ required: true })
  faculty: Faculty;
  @Prop({ required: true })
  language: Language;
  @Prop()
  url: string;
}
