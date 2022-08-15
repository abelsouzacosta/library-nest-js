import { InjectModel } from '@nestjs/mongoose';
import { UpdateResult } from 'mongodb';
import { Model } from 'mongoose';
import { CreateStudentDto } from 'src/students/application/dto/create-student.dto';
import { UpdateStudentDto } from 'src/students/application/dto/update-student.dto';
import { Student } from 'src/students/entities/student.entity';
import { IStudentRepository } from 'src/students/infra/interfaces/student-repository.interface';

export class StudentsRepository implements IStudentRepository {
  constructor(
    @InjectModel(Student.name)
    private readonly model: Model<Student>,
  ) {}

  async create(data: CreateStudentDto): Promise<Student> {
    return this.model.create(data);
  }

  async find(): Promise<Student[]> {
    return this.model.find();
  }

  async findById(id: string): Promise<Student> {
    return this.model.findById(id);
  }

  async findByEmail(email: string): Promise<Student> {
    return this.model.findOne({ email });
  }

  async findByRegisterNumber(register_number: number): Promise<Student> {
    return this.model.findOne({
      register_number,
    });
  }

  async update(id: string, data: UpdateStudentDto): Promise<UpdateResult> {
    return this.model.updateOne({ _id: id }, { ...data });
  }
}
