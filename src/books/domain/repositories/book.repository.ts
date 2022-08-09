import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'mongodb';
import { Model } from 'mongoose';
import { CreateBookDto } from 'src/books/application/dto/create-book.dto';
import { UpdateBookDto } from 'src/books/application/dto/update-book.dto';
import { Book } from 'src/books/entities/book.entity';
import { IBookRepository } from 'src/books/infra/interfaces/book-repository.interface';

@Injectable()
export class BookRepository implements IBookRepository {
  constructor(private readonly model: Model<Book>) {}

  async find(): Promise<Book[]> {
    return this.model.find();
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
    return this.model.create(data);
  }

  async update(id: string, data: UpdateBookDto): Promise<UpdateResult> {
    return this.model.updateOne(
      {
        _id: id,
      },
      { data },
    );
  }

  async delete(id: string): Promise<void> {
    await this.model.deleteOne({ _id: id });
  }
}
