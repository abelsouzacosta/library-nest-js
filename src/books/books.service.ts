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

  update(id: number, data: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
