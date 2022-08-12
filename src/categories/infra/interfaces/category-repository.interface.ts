import { UpdateWriteOpResult } from 'mongoose';
import { CreateCategoryDto } from 'src/categories/application/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/categories/application/dto/update-category.dto';
import { Category } from 'src/categories/entities/category.entity';

export interface ICategoryRepository {
  find(): Promise<Array<Category>>;

  findById(id: string): Promise<Category>;

  findByName(name: string): Promise<Category>;

  create(data: CreateCategoryDto): Promise<Category>;

  update(id: string, data: UpdateCategoryDto): Promise<UpdateWriteOpResult>;

  delete(id: string);
}
