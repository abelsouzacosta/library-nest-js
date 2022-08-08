import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './application/dto/create-author.dto';
import { UpdateAuthorDto } from './application/dto/update-author.dto';
import { AuthorsRepository } from './domain/repositories/authors.repository';

@Injectable()
export class AuthorsService {
  constructor(private readonly repository: AuthorsRepository) {}

  create(data: CreateAuthorDto) {
    return this.repository.create(data);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findById(id);
  }

  update(id: string, data: UpdateAuthorDto) {
    return this.repository.update(id, data);
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}
