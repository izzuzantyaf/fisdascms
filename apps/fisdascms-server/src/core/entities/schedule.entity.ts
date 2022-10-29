import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Faculty } from 'src/core/constants';
import { Document } from 'mongoose';
import { isNotEmpty, isURL, isObject, isNotEmptyObject } from 'class-validator';

export type ScheduleDocument = Schedule & Document;

export type ScheduleConstructorProps = Pick<
  Schedule,
  '_id' | 'faculty' | 'isActive' | 'url'
>;

@Schema({ timestamps: true })
export class Schedule {
  _id?: string;
  @Prop()
  faculty: Faculty | null;
  @Prop()
  isActive: boolean;
  @Prop()
  url: string;
  embedURL: string;

  constructor(props: ScheduleConstructorProps) {
    const { _id, faculty, isActive, url } = props;
    this._id = _id;
    this.faculty = faculty;
    this.isActive = isActive;
    this.url = url;

    this.embedURL = isNotEmpty(this.url)
      ? this.generateGDriveEmbedLink()
      : null;
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
    return isNotEmptyObject(validationErrors) ? validationErrors : null;
  }

  protected generateGDriveEmbedLink() {
    return this.url.replace('view', 'preview');
  }
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
