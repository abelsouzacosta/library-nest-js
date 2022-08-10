import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidIsbnException extends HttpException {
  constructor(isbn: string) {
    super(`isbn ${isbn} is invalid`, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
