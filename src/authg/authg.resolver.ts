import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthgService } from './authg.service';
import type { GqlContent } from 'src/common/interface/gql-context.interface';
import { RegisterInput } from './inputs/register.input';
import { AuthgModel } from './models/authg.model';
import { LoginInput } from './inputs/login.input';

@Resolver()
export class AuthgResolver {
  constructor(private readonly authgService: AuthgService) {}

  @Mutation(() => AuthgModel)
  async register(
    @Context() { res }: GqlContent,
    @Args('data') input: RegisterInput,
  ) {
    return this.authgService.register(res, input);
  }

  @Mutation(() => AuthgModel)
  async login(@Context() { res }: GqlContent, @Args('data') input: LoginInput) {
    return this.authgService.login(res, input);
  }

  @Mutation(() => AuthgModel)
  async refresh(@Context() { res, req }: GqlContent) {
    return this.authgService.refresh(req, res);
  }

  @Mutation(() => Boolean)
  async logout(@Context() { res }: GqlContent) {
    return this.authgService.logout(res);
  }
}
