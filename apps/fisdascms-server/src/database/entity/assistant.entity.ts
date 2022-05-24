import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AssistantLevel, Gender } from 'src/lib/constants';

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
    this._id = props._id;
    this.name = props.name;
    this.code = props.code;
    this.phoneNumber = props.phoneNumber;
    this.lineId = props.lineId;
    this.gender = props.gender;
    this.level = props.level;
    this.feedbackUrl = props.feedbackUrl;
    this.profilePictureUrl = props.profilePictureUrl;
  }
}

export const AssistantSchema = SchemaFactory.createForClass(Assistant);
