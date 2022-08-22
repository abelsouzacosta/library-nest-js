import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { AuthorNotFoundException } from '../exceptions/author-not-found.exception';
import { AuthorsRepository } from '../repositories/authors.repository';

@Injectable()
export class CheckAuthorExistsPipe implements PipeTransform {
  constructor(private readonly repository: AuthorsRepository) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') return value;

    const author = await this.repository.findById(value);

    if (!author) throw new AuthorNotFoundException(value);

    return value;
  }
}
