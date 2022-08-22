import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CategoryAlreadyExistsException } from '../exceptions/category-already-exists.exception';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CheckNameAlreadyTakenPipe implements PipeTransform {
  constructor(private readonly repository: CategoryRepository) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const nameAlreadyTaken = await this.repository.findByName(value.name);

    if (nameAlreadyTaken) throw new CategoryAlreadyExistsException(value.name);

    return value;
  }
}
