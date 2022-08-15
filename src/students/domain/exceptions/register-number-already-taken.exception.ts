import { HttpException, HttpStatus } from '@nestjs/common';

export class RegisterNumberAlreadyTakenException extends HttpException {
  constructor(register_number: number) {
    super(
      `register number ${register_number} already taken`,
      HttpStatus.CONFLICT,
    );
  }
}
