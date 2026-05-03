import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'generated/prisma/client';

enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
export class UsergModel implements User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field(() => String)
  password: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
