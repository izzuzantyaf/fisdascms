import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Faculty, Language } from '../constants/constants';
import { Document } from 'mongoose';

export type HandoutDocument = Handout & Document;

@Schema({ timestamps: true })
export class Handout {
  _id: string | number;
  @Prop({ required: true })
  faculty: Faculty;
  @Prop({ required: true })
  language: Language;
  @Prop()
  url: string;

  constructor(initialProps?: {
    _id: string | number;
    faculty: Faculty;
    language: Language;
    url: string;
  }) {
    const { _id, faculty, language, url } = initialProps;
    this._id = _id;
    this.faculty = faculty;
    this.language = language;
    this.url = url;
  }
}

export const HandoutSchema = SchemaFactory.createForClass(Handout);
