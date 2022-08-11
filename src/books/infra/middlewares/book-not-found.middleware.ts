import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { BookNotFoundException } from 'src/books/domain/exceptions/book-not-found.exception';
import { BooksRepository } from 'src/books/domain/repositories/book.repository';

@Injectable()
export class BookNotFoundMiddleware implements NestMiddleware {
  constructor(private readonly repository: BooksRepository) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    const bookExists = await this.repository.findById(id);

    if (!bookExists) throw new BookNotFoundException(id);

    next();
  }
}
