import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthorNotFoundException } from 'src/authors/domain/exceptions/author-not-found.exception';
import { AuthorsRepository } from 'src/authors/domain/repositories/authors.repository';

@Injectable()
export class AuthorNotFoundMiddleware implements NestMiddleware {
  constructor(private readonly repository: AuthorsRepository) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    const authorExists = await this.repository.findById(id);

    if (!authorExists) throw new AuthorNotFoundException(id);

    next();
  }
}
