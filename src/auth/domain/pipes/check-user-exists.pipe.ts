import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UserRepository } from 'src/users/domain/repositories/user.repository';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';

@Injectable()
export class CheckUserExistsPipe implements PipeTransform {
  constructor(private readonly repository: UserRepository) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const user = await this.repository.findByEmail(value.email);

    if (!user) throw new UserNotFoundException(value.email);

    return value;
  }
}
