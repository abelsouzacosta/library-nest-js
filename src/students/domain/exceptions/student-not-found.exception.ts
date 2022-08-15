import { HttpException, HttpStatus } from '@nestjs/common';

export class StudentNotFoundException extends HttpException {
  constructor(id: string) {
    super(`student ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
