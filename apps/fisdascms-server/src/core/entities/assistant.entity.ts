import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  isEmpty,
  isEnum,
  isNotEmpty,
  isNotEmptyObject,
  isObject,
} from 'class-validator';
import { Document } from 'mongoose';
import { AssistantLevel, Gender } from 'src/core/constants';

export type AssistantDocument = Assistant & Document;

@Schema({ timestamps: true })
export class Assistant {
  _id: string;
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

  protected validateName() {
    if (isEmpty(this.name)) return { name: 'Nama harus diisi' };
    const maxLength = 100;
    if (this.name.length > maxLength)
      return { name: `Nama tidak boleh melebihi ${maxLength} karakter` };
    return true;
  }

  protected validateCode() {
    if (isEmpty(this.code)) return { code: 'Kode asisten harus diisi' };
    if (this.code.length !== 3)
      return { code: 'Kode asisten harus 3 karakter' };
    return true;
  }

  protected validatePhoneNumber() {
    const validationRegex = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;
    if (isNotEmpty(this.phoneNumber))
      if (!validationRegex.test(this.phoneNumber))
        return { phoneNumber: 'Nomor telepon tidak valid' };
    return true;
  }

  protected validateGender() {
    if (isEmpty(this.gender)) return { gender: 'Jenis kelamin harus diisi' };
    if (!isEnum(this.gender, Gender))
      return { gender: 'Jenis kelamin tidak valid' };
    return true;
  }

  protected validateLevel() {
    if (isEmpty(this.level)) return { level: 'Level harus diisi' };
    if (!isEnum(this.level, AssistantLevel))
      return { level: 'Level tidak valid' };
    return true;
  }

  protected validateFeedbackUrl() {
    if (isNotEmpty(this.feedbackUrl))
      try {
        new URL(this.feedbackUrl);
      } catch (e) {
        return { feedbackUrl: 'Link feedback tidak valid' };
      }
    return true;
  }

  protected validateProfilePictureUrl() {
    if (isNotEmpty(this.profilePictureUrl))
      try {
        new URL(this.profilePictureUrl);
      } catch (e) {
        return { profilePictureUrl: 'Link profile picture tidak valid' };
      }
    return true;
  }

  validateProps(): object | null {
    const validationResults = [
      this.validateName(),
      this.validateCode(),
      this.validatePhoneNumber(),
      this.validateGender(),
      this.validateLevel(),
      this.validateFeedbackUrl(),
      this.validateProfilePictureUrl(),
    ];
    const errors = validationResults.reduce(
      (error, result) => (isObject(result) ? { ...error, ...result } : error),
      {},
    );
    console.log('Validation errors :', errors);
    return isNotEmptyObject(errors) ? errors : null;
  }
}

export const AssistantSchema = SchemaFactory.createForClass(Assistant);
