import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CodeOfConductDocument = CodeOfConduct & Document;

@Schema({ timestamps: true, collection: 'code_of_conducts' })
export class CodeOfConduct {
  _id: string;
  @Prop()
  url: string;
  previewUrl: string;

  constructor(props: { _id?: string; url?: string }) {
    const { _id, url } = props;
    this._id = _id;
    this.url = url;
    this.previewUrl = this.setPreviewUrl();
  }

  protected setPreviewUrl() {
    return this.url ? this.url.replace('view', 'preview') : null;
  }
}

export const CodeOfConductSchema = SchemaFactory.createForClass(CodeOfConduct);
