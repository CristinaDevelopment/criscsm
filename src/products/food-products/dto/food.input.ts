import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateFood {
  @Field()
  readonly name: string;

  @Field()
  readonly description: string;

  @Field()
  readonly promotion: string;

  @Field()
  readonly price: number;

  @Field()
  readonly discountPrice: number;

  @Field()
  readonly siteId: string;
  @Field()
  readonly parentId: string;

  @Field()
  readonly uid: string;
}

@InputType()
export class UpdateFood extends PartialType(CreateFood) {
  @Field({ nullable: true })
  readonly prescription?: string;

  @Field({ nullable: true })
  readonly preparation?: string;
}
