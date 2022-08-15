import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SsnAlreadyTakenException } from 'src/students/domain/exceptions/ssn-already-taken.exception';
import { StudentsRepository } from 'src/students/domain/repositories/students.repository';

@Injectable()
export class SsnAlreadyTakenMiddleware implements NestMiddleware {
  constructor(private readonly repository: StudentsRepository) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { ssn } = request.body;

    const ssnAlreadyTaken = await this.repository.findBySsn(ssn);

    if (ssnAlreadyTaken) throw new SsnAlreadyTakenException(ssn);

    next();
  }
}
