import { UpdateWriteOpResult } from 'mongoose';
import { CreateAuthorDto } from 'src/authors/application/dto/create-author.dto';
import { UpdateAuthorDto } from 'src/authors/application/dto/update-author.dto';
import { Author } from 'src/authors/entities/author.entity';

export interface IAuthorRepository {
  find(): Promise<Array<Author>>;

  findById(id: string): Promise<Author>;

  create(data: CreateAuthorDto): Promise<Author>;

  update(id: string, data: UpdateAuthorDto): Promise<UpdateWriteOpResult>;

  delete(id: string);
}
