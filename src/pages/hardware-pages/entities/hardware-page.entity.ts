import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class HardwarePage {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
