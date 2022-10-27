import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';
import { DataPage } from './food-page.model';

@Schema({ versionKey: false })
export class PageDocument extends AbstractDocument {
  @Prop({ type: DataPage })
  data: DataPage;
  @Prop({ trim: true })
  slug: string;
  @Prop({ trim: true })
  parentId: string;
  @Prop({ trim: true })
  siteId: string;
}

export const Page0Schema = SchemaFactory.createForClass(PageDocument);
export const Page1Schema = SchemaFactory.createForClass(PageDocument);
export const Page2Schema = SchemaFactory.createForClass(PageDocument);
export const Page3Schema = SchemaFactory.createForClass(PageDocument);
export const Page4Schema = SchemaFactory.createForClass(PageDocument);
export const Page5Schema = SchemaFactory.createForClass(PageDocument);
export const Page6Schema = SchemaFactory.createForClass(PageDocument);
export const Page7Schema = SchemaFactory.createForClass(PageDocument);
export const Page8Schema = SchemaFactory.createForClass(PageDocument);
export const Page9Schema = SchemaFactory.createForClass(PageDocument);
export const Page10Schema = SchemaFactory.createForClass(PageDocument);
export const Page0FoodSchema = SchemaFactory.createForClass(PageDocument);
export const Page1FoodSchema = SchemaFactory.createForClass(PageDocument);
export const Page2FoodSchema = SchemaFactory.createForClass(PageDocument);
export const Page3FoodSchema = SchemaFactory.createForClass(PageDocument);
export const Page4FoodSchema = SchemaFactory.createForClass(PageDocument);
export const Page5FoodSchema = SchemaFactory.createForClass(PageDocument);
export const Page6FoodSchema = SchemaFactory.createForClass(PageDocument);
export const Page7FoodSchema = SchemaFactory.createForClass(PageDocument);
export const Page8FoodSchema = SchemaFactory.createForClass(PageDocument);
export const Page9FoodSchema = SchemaFactory.createForClass(PageDocument);
export const Page10FoodSchema = SchemaFactory.createForClass(PageDocument);
export const Page0WearSchema = SchemaFactory.createForClass(PageDocument);
export const Page1WearSchema = SchemaFactory.createForClass(PageDocument);
export const Page2WearSchema = SchemaFactory.createForClass(PageDocument);
export const Page3WearSchema = SchemaFactory.createForClass(PageDocument);
export const Page4WearSchema = SchemaFactory.createForClass(PageDocument);
export const Page5WearSchema = SchemaFactory.createForClass(PageDocument);
export const Page6WearSchema = SchemaFactory.createForClass(PageDocument);
export const Page7WearSchema = SchemaFactory.createForClass(PageDocument);
export const Page8WearSchema = SchemaFactory.createForClass(PageDocument);
export const Page9WearSchema = SchemaFactory.createForClass(PageDocument);
export const Page10WearSchema = SchemaFactory.createForClass(PageDocument);
