import { InjectModel } from '@nestjs/mongoose';
import { UpdateResult } from 'mongodb';
import { Model } from 'mongoose';
import { CreateCategoryDto } from 'src/categories/application/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/categories/application/dto/update-category.dto';
import { Category } from 'src/categories/entities/category.entity';
import { ICategoryRepository } from 'src/categories/infra/interfaces/category-repository.interface';

export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly model: Model<Category>,
  ) {}

  async find(): Promise<Category[]> {
    return this.model.find();
  }

  async findById(id: string): Promise<Category> {
    return this.model.findById(id);
  }

  async findByName(name: string): Promise<Category> {
    return this.model.findOne({
      name,
    });
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    return this.model.create(data);
  }

  async update(id: string, data: UpdateCategoryDto): Promise<UpdateResult> {
    return this.model.updateOne(
      {
        _id: id,
      },
      {
        ...data,
      },
    );
  }

  async delete(id: string) {
    return this.model.deleteOne({ _id: id });
  }
}
