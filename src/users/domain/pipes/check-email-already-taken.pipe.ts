import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { EmailAlreadyTakenException } from 'src/shared/infra/exceptions/email-already-taken.exception';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class CheckEmailAlreadyTakenPipe implements PipeTransform {
  constructor(private readonly repository: UserRepository) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const emailAlreadyTaken = await this.repository.findByEmail(value.email);

    if (emailAlreadyTaken) throw new EmailAlreadyTakenException(value.email);

    return value;
  }
}
