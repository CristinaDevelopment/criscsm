import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';
import { Data } from './site.model';

@Schema({ versionKey: false })
export class SiteDocument extends AbstractDocument {
  @Prop({ type: Data })
  data: Data;
  @Prop({ trim: true })
  url: string;
}

export const SiteSchema = SchemaFactory.createForClass(SiteDocument);
export const SiteFoodSchema = SchemaFactory.createForClass(SiteDocument);
export const SiteWearSchema = SchemaFactory.createForClass(SiteDocument);
