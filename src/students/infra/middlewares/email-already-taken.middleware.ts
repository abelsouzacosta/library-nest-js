import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { EmailAlreadyTakenException } from 'src/students/domain/exceptions/email-already-taken.exception';
import { StudentsRepository } from 'src/students/domain/repositories/students.repository';

@Injectable()
export class EmailAlreadyTakenMiddleware implements NestMiddleware {
  constructor(private readonly repository: StudentsRepository) {}

  async use(request: Request, respoanse: Response, next: NextFunction) {
    const { email } = request.body;

    const emailAlreadyTaken = await this.repository.findByEmail(email);

    if (emailAlreadyTaken) throw new EmailAlreadyTakenException(email);

    next();
  }
}
