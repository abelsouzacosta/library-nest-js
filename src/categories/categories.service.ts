import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './domain/repositories/category.repository';
import { CreateCategoryDto } from './application/dto/create-category.dto';
import { UpdateCategoryDto } from './application/dto/update-category.dto';
import { AddBoookToCategoryDto } from './application/dto/add-book-to-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly repository: CategoryRepository) {}

  addBooksToCategory(id: string, data: AddBoookToCategoryDto) {
    return this.repository.addBookToCategory(id, data);
  }

  create(data: CreateCategoryDto) {
    return this.repository.create(data);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findById(id);
  }

  update(id: string, data: UpdateCategoryDto) {
    return this.repository.update(id, data);
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}
