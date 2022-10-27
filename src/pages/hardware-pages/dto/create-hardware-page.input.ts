import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateHardwarePageInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
