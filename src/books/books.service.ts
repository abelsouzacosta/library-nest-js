import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './application/dto/create-book.dto';
import { UpdateBookDto } from './application/dto/update-book.dto';
import { BooksRepository } from './domain/repositories/book.repository';

@Injectable()
export class BooksService {
  constructor(private readonly repository: BooksRepository) {}

  create(data: CreateBookDto) {
    return this.repository.create(data);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findById(id);
  }

  update(id: string, data: UpdateBookDto) {
    return this.repository.update(id, data);
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}
