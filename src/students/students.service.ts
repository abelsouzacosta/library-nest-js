import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './application/dto/create-student.dto';
import { UpdateStudentDto } from './application/dto/update-student.dto';
import { StudentsRepository } from './domain/repositories/students.repository';

@Injectable()
export class StudentsService {
  constructor(private readonly repository: StudentsRepository) {}

  create(data: CreateStudentDto) {
    return this.repository.create(data);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findById(id);
  }

  findByEmail(email: string) {
    return this.repository.findByEmail(email);
  }

  findBySsn(register_number: number) {
    return this.repository.findByRegisterNumber(register_number);
  }

  update(id: string, data: UpdateStudentDto) {
    return this.repository.update(id, data);
  }
}
