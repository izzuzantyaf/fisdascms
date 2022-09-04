import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isNotEmpty, isNotEmptyObject, isObject } from 'class-validator';
import { Document } from 'mongoose';

export type CodeOfConductDocument = CodeOfConduct & Document;

export type CodeOfConductConstructorProps = Pick<CodeOfConduct, '_id' | 'url'>;

@Schema({ timestamps: true, collection: 'code_of_conducts' })
export class CodeOfConduct {
  _id?: string;
  @Prop()
  url: string;
  previewUrl: string;

  constructor(props: CodeOfConductConstructorProps) {
    const { _id, url } = props;
    this._id = _id;
    this.url = url;
    this.previewUrl = this.setPreviewUrl();
  }

  protected validateUrl() {
    if (isNotEmpty(this.url))
      try {
        new URL(this.url);
      } catch (e) {
        return { url: 'Link tidak valid' };
      }
  }

  validateProps() {
    const validationResults = [this.validateUrl()];
    const errors = validationResults.reduce(
      (error, result) => (isObject(result) ? { ...error, ...result } : error),
      {},
    );
    console.log('Validation errors :', errors);
    return isNotEmptyObject(errors) ? errors : null;
  }

  protected setPreviewUrl() {
    return this.url ? this.url.replace('view', 'preview') : null;
  }
}

export const CodeOfConductSchema = SchemaFactory.createForClass(CodeOfConduct);
