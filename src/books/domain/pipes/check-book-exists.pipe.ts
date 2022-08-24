import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { BookNotFoundException } from 'src/shared/infra/exceptions/book-not-found.exception';
import { BooksRepository } from '../repositories/book.repository';

@Injectable()
export class CheckBookExistsPipe implements PipeTransform {
  constructor(private readonly repository: BooksRepository) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') return value;

    const book = await this.repository.findById(value);

    if (!book) throw new BookNotFoundException(value);

    return value;
  }
}
