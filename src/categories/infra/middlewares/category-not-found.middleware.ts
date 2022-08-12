import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CategoryNotFoundException } from 'src/categories/domain/exceptions/category-not-found.exception';
import { CategoryRepository } from 'src/categories/domain/repositories/category.repository';

@Injectable()
export class CategoryNotFoundMiddleware implements NestMiddleware {
  constructor(private readonly repository: CategoryRepository) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    const categoryFound = await this.repository.findById(id);

    if (!categoryFound) throw new CategoryNotFoundException(id);

    next();
  }
}
