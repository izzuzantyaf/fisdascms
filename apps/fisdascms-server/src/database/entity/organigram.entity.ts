import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrganigramDocument = Organigram & Document;

@Schema({ timestamps: true })
export class Organigram {
  _id: string;
  @Prop()
  url: string;
  previewUrl: string;

  constructor(initialProps?: { _id?: string; url?: string }) {
    const { _id, url } = initialProps;
    this._id = _id;
    this.url = url;
    this.previewUrl = this.setPreviewUrl();
  }

  protected setPreviewUrl() {
    return this.url ? this.url.replace('view', 'preview') : null;
  }
}

export const OrganigramSchema = SchemaFactory.createForClass(Organigram);
