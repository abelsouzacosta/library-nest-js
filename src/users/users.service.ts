import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './application/dto/create-user.dto';
import { UserRepository } from './domain/repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UserRepository) {}

  create(data: CreateUserDto) {
    return this.repository.create(data);
  }
}
