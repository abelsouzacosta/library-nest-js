import { CreateUserDto } from 'src/users/application/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

export interface IUserRepository {
  create(data: CreateUserDto): Promise<User>;

  findByEmail(email: string): Promise<User>;
}
