import { CreateHardwarePageInput } from './create-hardware-page.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHardwarePageInput extends PartialType(CreateHardwarePageInput) {
  @Field(() => Int)
  id: number;
}
