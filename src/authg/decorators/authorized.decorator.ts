import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { User } from 'generated/prisma/client';

export const Authorized = createParamDecorator(
  (data: keyof User, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    const request = ctx.getContext().req;

    const user = request.user as User;

    return data ? user?.[data] : user;
  },
);
