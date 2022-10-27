import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class CreateSite {
  @Field()
  readonly name: string;
  @Field()
  readonly domain: string;
  @Field()
  readonly description: string;
  @Field()
  readonly type: string;
  @Field({ nullable: true })
  readonly client?: string;
  @Field()
  readonly uid: string;
}

// @InputType()
// export class UpdateSite extends OmitType(CreateSite, ['client'] as const) {}
@InputType()
export class UpdateSite extends CreateSite {}

@InputType()
export class UpdateDataBase {
  @Field()
  readonly type: string;
}
@InputType()
export class UpdateImage {
  @Field({ nullable: true })
  readonly uid?: string;
  @Field()
  readonly src: string;
  @Field()
  readonly alt: string;
}
