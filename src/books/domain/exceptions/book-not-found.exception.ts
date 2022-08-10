import { HttpException, HttpStatus } from '@nestjs/common';

export class BookNotFoundExceptino extends HttpException {
  constructor(id: string) {
    super(`Book ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
