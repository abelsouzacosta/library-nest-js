import { HttpException, HttpStatus } from '@nestjs/common';

export class SsnAlreadyTakenException extends HttpException {
  constructor(ssn: string) {
    super(`ssn ${ssn} already taken`, HttpStatus.CONFLICT);
  }
}
