import { HttpException, HttpStatus } from '@nestjs/common';

export class MissingBearerTokenException extends HttpException {
  constructor() {
    super('Missing Bearer Token', HttpStatus.UNAUTHORIZED);
  }
}
