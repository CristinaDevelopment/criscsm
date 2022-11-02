import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract';
import { Image, Seo, UpdateDate } from 'src/common/model/model';
import { RelayTypes } from 'src/common/pagination/relay/relay.types';
import { Page } from 'src/pages/entities/food-page.model';
// import { Blog } from '../../blog/entities/blog.model';

@ObjectType()
export class Site extends AbstractModel {
  @Field(() => Data)
  readonly data: Data | string;
  @Field()
  readonly url: string;
  @Field(() => [Page], { nullable: true })
  readonly page?: Page[];
}
@ObjectType()
export class SiteFood extends Site {} 
@ObjectType()
export class SiteWear extends Site {} 
@ObjectType()
export class SiteMarketing extends Site {} 

@ObjectType()
export class Data {
  @Field()
  readonly name: string;
  @Field()
  readonly description: string;

  @Field(() => SiteData)
  readonly siteData: SiteData | string;
  @Field(() => SiteImages, { nullable: true })
  readonly siteImages?: SiteImages | string;

  @Field()
  readonly type: string;

  @Field(() => [DataBase])
  readonly dataBase: DataBase[];

  @Field(() => Seo)
  readonly seo: Seo | string;
  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;
}

@ObjectType()
export class SiteImages {
  @Field(() => Image, { nullable: true })
  readonly banner?: Image | string;
  @Field(() => Image, { nullable: true })
  readonly logo?: Image | string;
  @Field(() => Image, { nullable: true })
  readonly icon?: Image | string;
}
@ObjectType()
export class SiteData {
  @Field({ nullable: true })
  readonly numberPhone?: number;
  @Field({ nullable: true })
  readonly address?: string;
  @Field(() => Domain)
  readonly domain: Domain | string;
  @Field()
  readonly client: string;
}

@ObjectType()
export class DataBase {
  @Field()
  readonly uid: string;
  @Field()
  readonly label: string;
  @Field()
  readonly value: string;
}

@ObjectType()
export class Domain {
  @Field()
  readonly name: string;
  @Field()
  readonly dlt: string;
}

@ObjectType()
export class User extends AbstractModel {
  @Field()
  readonly name: string;
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
  @Field(() => Image)
  readonly image: Image | string;
}

@ObjectType()
export class ListSiteResponse extends RelayTypes<Site>(Site) {}
