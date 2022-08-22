import { InjectModel } from '@nestjs/mongoose';
import { UpdateResult } from 'mongodb';
import { Model } from 'mongoose';
import { AddBoookToCategoryDto } from 'src/categories/application/dto/add-book-to-category.dto';
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
    return this.model
      .find()
      .populate({
        path: 'books',
        populate: { path: 'authors' },
      })
      .populate('createdBy', 'name')
      .populate('updatedBy', 'name');
  }

  async findById(id: string): Promise<Category> {
    return this.model
      .findById(id)
      .populate({
        path: 'books',
        populate: { path: 'authors' },
      })
      .populate('createdBy', 'name')
      .populate('updatedBy', 'name');
  }

  async findByName(name: string): Promise<Category> {
    return this.model.findOne({
      name,
    });
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    return this.model.create({
      ...data,
      createdBy: data.user,
    });
  }

  async addBookToCategory(
    id: string,
    data: AddBoookToCategoryDto,
  ): Promise<UpdateResult> {
    return this.model.updateOne(
      { _id: id },
      {
        $push: { books: data.books },
        $set: { updatedBy: data.user },
      },
    );
  }

  async update(id: string, data: UpdateCategoryDto): Promise<UpdateResult> {
    return this.model.updateOne(
      {
        _id: id,
      },
      {
        ...data,
        $set: { updatedBy: data.user },
      },
    );
  }

  async delete(id: string) {
    return this.model.deleteOne({ _id: id });
  }
}
