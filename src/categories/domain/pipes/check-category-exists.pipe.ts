import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CategoryNotFoundException } from '../exceptions/category-not-found.exception';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CheckCategoryExistsPipe implements PipeTransform {
  constructor(private readonly repository: CategoryRepository) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') return value;

    const category = await this.repository.findById(value);

    if (!category) throw new CategoryNotFoundException(value);

    return value;
  }
}
