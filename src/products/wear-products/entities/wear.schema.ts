import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';
import { DataWear } from './wear.model';

@Schema({ versionKey: false })
export class WearDocument extends AbstractDocument {
  @Prop({ type: DataWear })
  data: DataWear;

  @Prop({ trim: true })
  siteId: string;

  @Prop({ trim: true })
  parentId: string;
}

export const ClothingSchema = SchemaFactory.createForClass(WearDocument);
export const BackpackSchema = SchemaFactory.createForClass(WearDocument);
export const HandbagSchema = SchemaFactory.createForClass(WearDocument);

export const FurnitureSchema = SchemaFactory.createForClass(WearDocument);

export const HardwareStoreSchema = SchemaFactory.createForClass(WearDocument);

export const GlassesSchema = SchemaFactory.createForClass(WearDocument);
export const EngineSchema = SchemaFactory.createForClass(WearDocument);
