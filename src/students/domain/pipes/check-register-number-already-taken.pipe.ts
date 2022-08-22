import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { RegisterNumberAlreadyTakenException } from '../exceptions/register-number-already-taken.exception';
import { StudentsRepository } from '../repositories/students.repository';

@Injectable()
export class CheckRegisterNumberAlreadyTakenPipe implements PipeTransform {
  constructor(private readonly repository: StudentsRepository) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const registerNumber = await this.repository.findByRegisterNumber(
      value.register_number,
    );

    if (registerNumber)
      throw new RegisterNumberAlreadyTakenException(value.register_number);

    return value;
  }
}
