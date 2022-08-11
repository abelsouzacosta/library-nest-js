import { HttpException, HttpStatus } from '@nestjs/common';

export class CategoryAlreadyExistsException extends HttpException {
  constructor(name: string) {
    super(`category ${name} already exists`, HttpStatus.CONFLICT);
  }
}
