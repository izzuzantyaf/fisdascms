import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Faculty, Language } from 'src/core/constants';
import { Document } from 'mongoose';
import { isNotEmpty, isNotEmptyObject, isObject, isURL } from 'class-validator';

export type HandoutDocument = Handout & Document;

export type HandoutConstructorProps = Pick<
  Handout,
  '_id' | 'faculty' | 'language' | 'isActive' | 'url'
>;

@Schema({ timestamps: true })
export class Handout {
  _id?: string;
  @Prop({ required: true })
  faculty: Faculty;
  @Prop({ required: true })
  language: Language;
  @Prop({ required: true })
  isActive: boolean;
  @Prop()
  url: string;

  constructor(props: HandoutConstructorProps) {
    const { _id, faculty, language, isActive, url } = props;
    this._id = _id;
    this.faculty = faculty;
    this.language = language;
    this.isActive = isActive;
    this.url = url;
  }

  protected isUrlValid() {
    if (isNotEmpty(this.url))
      if (!isURL(this.url)) return { url: 'Link tidak valid' };
    return true;
  }

  validateProps() {
    const validationResults = [this.isUrlValid()];
    const validationErrors = validationResults.reduce(
      (error, result) => (isObject(result) ? { ...error, ...result } : error),
      {},
    );
    console.log('Validation errors :', validationErrors);
    return isNotEmptyObject(validationErrors) ? validationErrors : null;
  }
}

export const HandoutSchema = SchemaFactory.createForClass(Handout);
