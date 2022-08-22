import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateResult } from 'mongodb';
import { Model } from 'mongoose';
import { AddAuthorsDto } from 'src/books/application/dto/add-authors.dto';
import { CreateBookDto } from 'src/books/application/dto/create-book.dto';
import { UpdateBookDto } from 'src/books/application/dto/update-book.dto';
import { Book } from 'src/books/entities/book.entity';
import { IBookRepository } from 'src/books/infra/interfaces/book-repository.interface';

@Injectable()
export class BooksRepository implements IBookRepository {
  constructor(
    @InjectModel(Book.name)
    private readonly model: Model<Book>,
  ) {}

  async find(): Promise<Book[]> {
    return this.model
      .find()
      .populate('authors', 'name')
      .populate('createdBy', 'name')
      .populate('updatedBy', 'name');
  }

  async findById(id: string): Promise<Book> {
    return this.model.findById(id);
  }

  async findByIsbn(isbn: string): Promise<Book> {
    return this.model.findOne({
      isbn,
    });
  }

  async create(data: CreateBookDto): Promise<Book> {
    return this.model.create({
      ...data,
      createdBy: data.user,
    });
  }

  async update(id: string, data: UpdateBookDto): Promise<UpdateResult> {
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

  async delete(id: string): Promise<void> {
    await this.model.deleteOne({ _id: id });
  }

  async addAuthors(id: string, data: AddAuthorsDto): Promise<UpdateResult> {
    return this.model.updateOne(
      { _id: id },
      {
        $push: { authors: data.authors },
        $set: { updatedBy: data.user },
      },
    );
  }
}
