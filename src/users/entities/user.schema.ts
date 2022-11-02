import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';
import { UpdateDate } from 'src/common/model/model';
import { DataUser } from './user.model';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop({ type: DataUser })
  data: DataUser;
  @Prop({ unique: true })
  email: string;
  @Prop()
  password: string;
  @Prop()
  siteId: string;

}
export const UserSchema = SchemaFactory.createForClass(UserDocument);
export const UserMarketingSchema = SchemaFactory.createForClass(UserDocument);
