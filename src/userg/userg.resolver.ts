import { Query, Resolver } from '@nestjs/graphql';
import { UsergService } from './userg.service';
import { UsergModel } from './models/userg.model';
import { Authorization } from 'src/authg/decorators/authorization.decorator';
import { Authorized } from 'src/authg/decorators/authorized.decorator';
import { User } from 'generated/prisma/client';

@Resolver()
export class UsergResolver {
  constructor(private readonly usergService: UsergService) {}

  @Authorization()
  @Query(() => UsergModel)
  getMe(@Authorized() user: User) {
    return user;
  }

  @Query(() => [UsergModel])
  getUsers() {
    return this.usergService.findAll();
  }
}
