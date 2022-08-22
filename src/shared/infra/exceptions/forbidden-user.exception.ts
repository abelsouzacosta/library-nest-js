import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenUserException extends HttpException {
  constructor(email: string) {
    super(
      `User ${email} forbidden to request due to inexistent instance`,
      HttpStatus.FORBIDDEN,
    );
  }
}
