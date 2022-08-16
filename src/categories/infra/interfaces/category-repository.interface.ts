import { UpdateWriteOpResult } from 'mongoose';
import { AddBoookToCategoryDto } from 'src/categories/application/dto/add-book-to-category.dto';
import { CreateCategoryDto } from 'src/categories/application/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/categories/application/dto/update-category.dto';
import { Category } from 'src/categories/entities/category.entity';

export interface ICategoryRepository {
  find(): Promise<Array<Category>>;

  findById(id: string): Promise<Category>;

  findByName(name: string): Promise<Category>;

  create(data: CreateCategoryDto): Promise<Category>;

  addBookToCategory(
    id: string,
    data: AddBoookToCategoryDto,
  ): Promise<UpdateWriteOpResult>;

  update(id: string, data: UpdateCategoryDto): Promise<UpdateWriteOpResult>;

  delete(id: string);
}
