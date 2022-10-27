import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';
import { UpdateDate } from 'src/common/model/model';
import { DataFood } from './food-product.model';

@Schema({ versionKey: false })
export class FoodDocument extends AbstractDocument {
  @Prop({ type: DataFood })
  data: DataFood;

  @Prop({ trim: true })
  siteId: string;

  @Prop({ trim: true })
  parentId: string;
}

export const MealSchema = SchemaFactory.createForClass(FoodDocument);
// export const MealSchema = SchemaFactory.createForClass(WearDocument);
