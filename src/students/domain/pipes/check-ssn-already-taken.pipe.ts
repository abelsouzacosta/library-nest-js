import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { SsnAlreadyTakenException } from '../exceptions/ssn-already-taken.exception';
import { StudentsRepository } from '../repositories/students.repository';

@Injectable()
export class CheckSsnAlreadyTakenPipe implements PipeTransform {
  constructor(private readonly repository: StudentsRepository) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const ssnAlreadyTaken = await this.repository.findBySsn(value.ssn);

    if (ssnAlreadyTaken) throw new SsnAlreadyTakenException(value.ssn);

    return value;
  }
}
