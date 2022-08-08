import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthorNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Author ${id} was not found`, HttpStatus.NOT_FOUND);
  }
}
