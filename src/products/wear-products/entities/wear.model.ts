import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract';
import { Image, Seo, Tags, UpdateDate } from 'src/common/model/model';
import { RelayTypes } from 'src/common/pagination/relay/relay.types';

@ObjectType()
export class Wear extends AbstractModel {
  @Field(() => DataWear)
  readonly data: DataWear | string;

  @Field()
  readonly siteId: string;

  @Field()
  readonly parentId: string;

}

@ObjectType()
export class DataWear {
  @Field()
  readonly type: string;
  @Field()
  readonly name: string;
  @Field()
  readonly slug: string;
  @Field()
  readonly mark: string;
  @Field()
  readonly inStock: number;
  @Field()
  readonly price: number;
  @Field()
  readonly discountPrice: number;
  @Field()
  readonly description: string;
  @Field(() => Promotion)
  readonly promotion: Promotion | string;
  
  @Field({ nullable: true })
  readonly details?: string;

  @Field({ nullable: true })
  readonly featured?: string;
  
  @Field({ nullable: true })
  readonly specs?: string;

  @Field(() => [Tags])
  readonly tags?: Tags[];

  @Field(() => [Image])
  readonly image: Image[];
  
  @Field(() => Seo)
  readonly seo: Seo | string;

  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;
}


@ObjectType()
export class Promotion {
  @Field()
  name: string;
  @Field()
  href: string;
}

@ObjectType()
export class DeleteWears {
  @Field(() => [String])
  ids: string[];
  @Field()
  type: string;
}

@ObjectType()
export class ColorWear {
  @Field()
  readonly uid: string;
  @Field()
  readonly name: string;
  @Field()
  readonly class: string;
  @Field()
  readonly selectedClass: string;
}

@ObjectType()
export class SizesWear {
  @Field()
  readonly uid: string;
  @Field()
  readonly name: string;
  @Field()
  readonly inStock: number;
}

@ObjectType()
export class Clothing extends Wear {}
@ObjectType()
export class Backpack extends Wear {}
@ObjectType()
export class Handbag extends Wear {}

@ObjectType()
export class Furniture extends Wear {}

@ObjectType()
export class HardwareStore extends Wear {}

@ObjectType()
export class Glasses extends Wear {}
@ObjectType()
export class Engine extends Wear {}

@ObjectType()
export class ListWear extends RelayTypes<Wear>(Wear) {}
