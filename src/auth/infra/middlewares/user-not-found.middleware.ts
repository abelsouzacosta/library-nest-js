import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserNotFoundException } from 'src/auth/application/exceptions/user-not-found.exception';
import { UserRepository } from 'src/users/domain/repositories/user.repository';

@Injectable()
export class UserNotFoundMiddleware implements NestMiddleware {
  constructor(private readonly repository: UserRepository) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { email } = request.body;

    const user = await this.repository.findByEmail(email);

    if (!user) throw new UserNotFoundException(email);

    next();
  }
}
