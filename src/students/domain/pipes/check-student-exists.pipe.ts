import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { StudentNotFoundException } from '../exceptions/student-not-found.exception';
import { StudentsRepository } from '../repositories/students.repository';

@Injectable()
export class CheckStudentExistsPipe implements PipeTransform {
  constructor(private readonly repository: StudentsRepository) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') return value;

    const student = await this.repository.findById(value);

    if (!student) throw new StudentNotFoundException(value);

    return value;
  }
}
