import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Gender, AssistantLevel } from '../constants/constants';

export type AssistantDocument = Assistant & Document;

@Schema({ timestamps: true })
export class Assistant {
  _id: string | number;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  code: string;
  @Prop()
  phoneNumber: string;
  @Prop()
  lineId: string;
  @Prop({ required: true })
  gender: Gender;
  @Prop({ required: true })
  level: AssistantLevel;
  @Prop()
  feedbackUrl: string;
  @Prop()
  profilePictureUrl: string;

  constructor(props) {
    const {
      _id,
      name,
      code,
      phoneNumber,
      lineId,
      gender,
      level,
      feedbackUrl,
      profilePictureUrl,
    } = props;

    this._id = _id;
    this.name = name;
    this.code = code;
    this.phoneNumber = phoneNumber;
    this.lineId = lineId;
    this.gender = gender;
    this.level = level;
    this.feedbackUrl = feedbackUrl;
    this.profilePictureUrl = profilePictureUrl;
  }
}

export const AssistantSchema = SchemaFactory.createForClass(Assistant);
