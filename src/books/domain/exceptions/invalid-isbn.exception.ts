import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidIsbnException extends HttpException {
  constructor(isbn: string) {
    super(
      `isbn ${isbn} is invalid,a isbn must follow pattern xxx-xx-xxxxx-xx-x`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
