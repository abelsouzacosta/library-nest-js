import { HttpException, HttpStatus } from '@nestjs/common';

export class CategoryNotFoundException extends HttpException {
  constructor(id: string) {
    super(`category ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
