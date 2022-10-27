import { InputType, Field, PartialType, ID, OmitType } from '@nestjs/graphql';
import { Image } from 'src/common/model/model';

@InputType()
export class CreateWear {
  @Field()
  readonly name: string;

  @Field()
  readonly mark: string;

  @Field()
  readonly description: string;

  @Field()
  readonly promotion: string;


  @Field()
  readonly inStock: number;

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
export class UpdateWear extends PartialType(CreateWear) {
}

@InputType()
export class UpdateSpecs {
  @Field()
  readonly text: string;
}



// @InputType()
// export class UpdateDetails {
//   @Field()
//   readonly material: string;
//   @Field()
//   readonly color: string;
//   @Field()
//   readonly finishing: string;
//   @Field()
//   readonly logo: string;
//   @Field()
//   readonly accessories: string;
//   @Field(() => [String])
//   readonly dimensions: string[];
// }

@InputType()
export class UpdateTags extends PartialType(UpdateSpecs) {}

//TODO: articleType

@InputType()
export class AddColors {
  @Field()
  readonly name: string;
  @Field()
  readonly class: string;
  @Field()
  readonly selectedClass: string;
}
@InputType()
export class UpdateColors extends PartialType(AddColors) {
  @Field(() => ID)
  readonly id: string;
}
@InputType()
export class RemoveColors extends OmitType(UpdateColors, [
  'name',
  'class',
  'selectedClass',
]) {}

@InputType()
export class AddSizes {
  @Field()
  readonly name: string;
  @Field()
  readonly inStock: number;
}

@InputType()
export class UpdateSizes extends PartialType(AddSizes) {
  @Field(() => ID)
  readonly id: string;
}

@InputType()
export class RemoveSizes extends OmitType(UpdateSizes, ['name', 'inStock']) {}

@InputType()
export class Search {
  @Field({ nullable: true })
  readonly title: string;
}
@InputType()
export class Product {
  @Field({ nullable: true })
  readonly name: string;
  @Field({ nullable: true })
  readonly category: string;
  @Field({ nullable: true })
  readonly status: boolean;
  @Field({ nullable: true })
  readonly site: string;
}
