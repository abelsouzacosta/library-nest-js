import { HttpException, HttpStatus } from '@nestjs/common';

export class BookNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Book ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
