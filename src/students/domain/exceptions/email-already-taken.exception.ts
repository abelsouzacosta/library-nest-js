import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyTakenException extends HttpException {
  constructor(email: string) {
    super(`email ${email} already taken`, HttpStatus.CONFLICT);
  }
}
