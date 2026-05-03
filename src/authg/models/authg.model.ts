import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthgModel {
  @Field(() => String)
  accessToken: string;
}
