import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isNotEmpty, isNotEmptyObject, isObject, isURL } from 'class-validator';
import { Document } from 'mongoose';

export type OrganigramDocument = Organigram & Document;

export type OrganigramConstructorProps = Pick<Organigram, '_id' | 'url'>;

@Schema({ timestamps: true })
export class Organigram {
  _id?: string;
  @Prop()
  url: string;
  previewUrl: string;

  constructor(initialProps?: OrganigramConstructorProps) {
    const { _id, url } = initialProps;
    this._id = _id;
    this.url = url;
    this.previewUrl = this.setPreviewUrl();
  }

  protected setPreviewUrl() {
    return this.url ? this.url.replace('view', 'preview') : null;
  }

  protected validateUrl() {
    if (isNotEmpty(this.url))
      if (!isURL(this.url)) return { url: 'Link tidak valid' };
    return true;
  }

  validateProps() {
    const validationResults = [this.validateUrl()];
    const errors = validationResults.reduce(
      (error, result) => (isObject(result) ? { ...error, ...result } : error),
      {},
    );
    return isNotEmptyObject(errors) ? errors : null;
  }
}

export const OrganigramSchema = SchemaFactory.createForClass(Organigram);
