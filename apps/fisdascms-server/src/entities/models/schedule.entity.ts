import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Faculty } from '../constants/constants';
import { Document } from 'mongoose';

export type ScheduleDocument = Schedule & Document;

@Schema({ timestamps: true })
export class Schedule {
  _id: string | number;
  @Prop()
  faculty: Faculty | null;
  @Prop()
  isActive: boolean;
  @Prop()
  url: string;

  constructor(props?: {
    _id?: string | number;
    faculty?: Faculty | null;
    isActive?: boolean;
    url?: string;
  }) {
    const { _id, faculty, isActive, url } = props;
    this._id = _id;
    this.faculty = faculty;
    this.isActive = isActive;
    this.url = url;
  }
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
