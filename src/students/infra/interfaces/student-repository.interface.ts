import { UpdateWriteOpResult } from 'mongoose';
import { CreateStudentDto } from 'src/students/application/dto/create-student.dto';
import { UpdateStudentDto } from 'src/students/application/dto/update-student.dto';
import { Student } from 'src/students/entities/student.entity';

export interface IStudentRepository {
  find(): Promise<Array<Student>>;

  findById(id: string): Promise<Student>;

  findByEmail(email: string): Promise<boolean>;

  findByRegisterNumber(register_number: number): Promise<boolean>;

  findBySsn(ssn: string): Promise<boolean>;

  create(data: CreateStudentDto): Promise<Student>;

  update(id: string, data: UpdateStudentDto): Promise<UpdateWriteOpResult>;

  incrementLoans(id: string): Promise<UpdateWriteOpResult>;
}
