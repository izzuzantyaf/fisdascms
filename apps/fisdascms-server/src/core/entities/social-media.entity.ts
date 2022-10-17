import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { isNotEmpty, isURL, isObject, isNotEmptyObject } from 'class-validator';

export type SocialMediaDocument = SocialMedia & Document;

export type SocialMediaConstructorProps = Pick<
  SocialMedia,
  '_id' | 'name' | 'url' | 'faIconName' | 'isVisible'
>;

@Schema({ collection: 'social_medias', timestamps: true })
export class SocialMedia {
  _id?: string;
  @Prop({ required: true })
  name: string;
  @Prop()
  url: string;
  @Prop()
  faIconName: string;
  @Prop({ required: true })
  isVisible: boolean;

  constructor(props: SocialMediaConstructorProps) {
    const { _id, name, faIconName, url, isVisible } = props;
    this._id = _id;
    this.name = name;
    this.faIconName = faIconName;
    this.url = url;
    this.isVisible = isVisible;
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

export const SocialMediaSchema = SchemaFactory.createForClass(SocialMedia);
