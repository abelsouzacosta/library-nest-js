import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { EmailAlreadyTakenException } from 'src/shared/infra/exceptions/email-already-taken.exception';
import { UserRepository } from 'src/users/domain/repositories/user.repository';

@Injectable()
export class EmailAlreadyTakenMiddleware implements NestMiddleware {
  constructor(private readonly repository: UserRepository) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { email } = request.body;

    const emailAlreadyExists = await this.repository.findByEmail(email);

    if (emailAlreadyExists) throw new EmailAlreadyTakenException(email);

    next();
  }
}
