import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Language } from 'src/lib/constants';

export type PracticumModuleDocument = PracticumModule & Document;

export type PreTask = {
  url: string;
  isActive: boolean;
};

@Schema({ timestamps: true, collection: 'practicum_modules' })
export class PracticumModule {
  _id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  code: string;
  @Prop({ required: true })
  language: Language;
  @Prop({ required: true })
  faIconName: string;
  @Prop(
    raw({
      url: { type: String },
      isActive: { type: Boolean },
    }),
  )
  preTask: PreTask;
  @Prop(
    raw({
      url: { type: String },
      isActive: { type: Boolean },
    }),
  )
  video: object;
  @Prop(
    raw({
      url: { type: String },
      isActive: { type: Boolean },
    }),
  )
  simulator: object;
  @Prop(
    raw({
      url: { type: String },
      isActive: { type: Boolean },
    }),
  )
  journalCover: object;

  constructor(props) {
    const {
      _id,
      name,
      code,
      language,
      faIconName,
      preTask,
      video,
      simulator,
      journalCover,
    } = props;
    this._id = _id;
    this.name = name;
    this.code = code;
    this.language = language;
    this.faIconName = faIconName;
    this.preTask = preTask;
    this.video = video;
    this.simulator = simulator;
    this.journalCover = journalCover;
  }
}

export const PracticumModuleSchema =
  SchemaFactory.createForClass(PracticumModule);
