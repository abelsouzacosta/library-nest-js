import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CategoryAlreadyExistsException } from 'src/categories/domain/exceptions/category-already-exists.exception';
import { CategoryRepository } from 'src/categories/domain/repositories/category.repository';

@Injectable()
export class CategoryAlreadyExistsMiddleware implements NestMiddleware {
  constructor(private readonly repository: CategoryRepository) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { name } = request.body;

    const categoryExists = await this.repository.findByName(name);

    if (categoryExists) throw new CategoryAlreadyExistsException(name);

    next();
  }
}
