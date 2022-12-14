import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { CreateAuthorDto } from 'src/authors/application/dto/create-author.dto';
import { UpdateAuthorDto } from 'src/authors/application/dto/update-author.dto';
import { Author } from 'src/authors/entities/author.entity';
import { IAuthorRepository } from 'src/authors/infra/interfaces/author-repository.interface';

@Injectable()
export class AuthorsRepository implements IAuthorRepository {
  constructor(
    @InjectModel(Author.name)
    private readonly model: Model<Author>,
  ) {}

  async find(): Promise<Author[]> {
    return this.model
      .find()
      .populate('createdBy', 'name')
      .populate('updatedBy', 'name');
  }

  async findById(id: string): Promise<Author> {
    return this.model
      .findById(id)
      .populate('createdBy', 'name')
      .populate('updatedBy', 'name');
  }

  async create(data: CreateAuthorDto): Promise<Author> {
    return this.model.create({
      ...data,
      createdBy: data.user,
    });
  }

  async update(
    id: string,
    { name, biography, date_of_birth, date_of_death, user }: UpdateAuthorDto,
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateOne(
      { _id: id },
      {
        name,
        biography,
        date_of_birth,
        date_of_death,
        $set: { updatedBy: user },
      },
    );
  }

  async delete(id: string) {
    return this.model.deleteOne({ _id: id });
  }
}
