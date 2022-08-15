import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { StudentNotFoundException } from 'src/students/domain/exceptions/student-not-found.exception';
import { StudentsRepository } from 'src/students/domain/repositories/students.repository';

@Injectable()
export class StudentNotFoundMiddleware implements NestMiddleware {
  constructor(private readonly repository: StudentsRepository) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    const studentExists = await this.repository.findById(id);

    if (!studentExists) throw new StudentNotFoundException(id);

    next();
  }
}
