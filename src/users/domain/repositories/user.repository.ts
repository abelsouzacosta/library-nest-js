import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/application/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { IUserRepository } from 'src/users/infra/interfaces/user-repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly model: Model<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    return this.model.create(data);
  }

  async findByEmail(email: string) {
    return this.model.findOne({
      email,
    });
  }
}
