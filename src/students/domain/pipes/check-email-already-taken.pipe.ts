import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { EmailAlreadyTakenException } from 'src/shared/infra/exceptions/email-already-taken.exception';
import { StudentsRepository } from '../repositories/students.repository';

@Injectable()
export class CheckEmailAlreadyTakenPipe implements PipeTransform {
  constructor(private readonly repository: StudentsRepository) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body' || value.email === undefined) return value;

    const isEmailAlreadyTaken = await this.repository.findByEmail(value.email);

    if (isEmailAlreadyTaken) throw new EmailAlreadyTakenException(value.email);

    return value;
  }
}
