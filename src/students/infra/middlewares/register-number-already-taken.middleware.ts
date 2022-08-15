import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RegisterNumberAlreadyTakenException } from 'src/students/domain/exceptions/register-number-already-taken.exception';
import { StudentsRepository } from 'src/students/domain/repositories/students.repository';

@Injectable()
export class RegisterNumberAlreadyTakenMiddleware implements NestMiddleware {
  constructor(private readonly repository: StudentsRepository) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { register_number } = request.body;

    const registerNumberAlreadyTaken =
      await this.repository.findByRegisterNumber(register_number);

    if (registerNumberAlreadyTaken)
      throw new RegisterNumberAlreadyTakenException(register_number);

    next();
  }
}
