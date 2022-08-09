import { UpdateWriteOpResult } from 'mongoose';
import { AddAuthorsDto } from 'src/books/application/dto/add-authors.dto';
import { CreateBookDto } from 'src/books/application/dto/create-book.dto';
import { UpdateBookDto } from 'src/books/application/dto/update-book.dto';
import { Book } from 'src/books/entities/book.entity';

export interface IBookRepository {
  find(): Promise<Array<Book>>;

  findById(id: string): Promise<Book>;

  findByIsbn(isbn: string): Promise<Book>;

  addAuthors(id: string, data: AddAuthorsDto): Promise<UpdateWriteOpResult>;

  create(data: CreateBookDto): Promise<Book>;

  update(id: string, data: UpdateBookDto): Promise<UpdateWriteOpResult>;

  delete(id: string): Promise<void>;
}
