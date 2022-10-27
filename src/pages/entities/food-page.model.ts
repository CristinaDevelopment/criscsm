import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract';
import { Image, Seo, UpdateDate } from 'src/common/model/model';
import { RelayTypes } from 'src/common/pagination/relay/relay.types';
import { Meal } from 'src/products/food-products/entities/food-product.model';

@ObjectType()
export class Page extends AbstractModel {
  @Field(() => DataPage)
  readonly data: DataPage | string;
  @Field()
  readonly slug: string;
  @Field()
  readonly siteId: string;
  @Field()
  readonly parentId: string;
  @Field(() => [Page])
  readonly page?: Page[];
  // @Field(() => [Product])
  // readonly product?: Product[];
}

@ObjectType()
export class DataPage {
  @Field()
  readonly type: string;
  @Field({ nullable: true })
  readonly icon?: string;
  @Field(() => Seo)
  readonly seo: Seo | string;
  @Field(() => [ComponentPage])
  readonly section?: ComponentPage[];
  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;
}

@ObjectType()
export class ComponentPage {
  @Field()
  readonly uid: string;
  @Field()
  readonly component: string;
  @Field()
  readonly html: string;
}

@ObjectType()
export class Page0Wear extends Page {}
@ObjectType()
export class Page1Wear extends Page {
  @Field(() => [Meal])
  readonly product?: Meal[];
}
@ObjectType()
export class Page2Wear extends Page {}
@ObjectType()
export class Page3Wear extends Page {}
@ObjectType()
export class Page4Wear extends Page {}
@ObjectType()
export class Page5Wear extends Page {}
@ObjectType()
export class Page6Wear extends Page {}
@ObjectType()
export class Page7Wear extends Page {}
@ObjectType()
export class Page8Wear extends Page {}
@ObjectType()
export class Page9Wear extends Page {}
@ObjectType()
export class Page10Wear extends Page {}

@ObjectType()
export class Page0Food extends Page {}
@ObjectType()
export class Page1Food extends Page {}
@ObjectType()
export class Page2Food extends Page {}
@ObjectType()
export class Page3Food extends Page {}
@ObjectType()
export class Page4Food extends Page {}
@ObjectType()
export class Page5Food extends Page {}
@ObjectType()
export class Page6Food extends Page {}
@ObjectType()
export class Page7Food extends Page {}
@ObjectType()
export class Page8Food extends Page {}
@ObjectType()
export class Page9Food extends Page {}
@ObjectType()
export class Page10Food extends Page {}

@ObjectType()
export class ListPage extends RelayTypes<Page>(Page) {}
