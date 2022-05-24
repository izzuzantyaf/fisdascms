import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Faculty, Language } from 'src/lib/constants';
import { Document } from 'mongoose';

export type HandoutDocument = Handout & Document;

@Schema({ timestamps: true })
export class Handout {
  _id: string;
  @Prop({ required: true })
  faculty: Faculty;
  @Prop({ required: true })
  language: Language;
  @Prop({ required: true })
  isActive: boolean;
  @Prop()
  url: string;

  constructor(initialProps?: {
    _id?: string;
    faculty?: Faculty;
    language?: Language;
    isActive?: boolean;
    url?: string;
  }) {
    const { _id, faculty, language, isActive, url } = initialProps;
    this._id = _id;
    this.faculty = faculty;
    this.language = language;
    this.isActive = isActive;
    this.url = url;
  }
}

export const HandoutSchema = SchemaFactory.createForClass(Handout);
