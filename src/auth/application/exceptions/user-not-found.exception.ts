import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(email: string) {
    super(`user ${email} not found`, HttpStatus.NOT_FOUND);
  }
}
