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
    return this.model.create({
      ...data,
      createdBy: data.user,
    });
  }

  async find(): Promise<Student[]> {
    return this.model
      .find()
      .populate('createdBy', 'name')
      .populate('updatedBy', 'name');
  }

  async findById(id: string): Promise<Student> {
    return this.model
      .findById(id)
      .populate('createdBy', 'name')
      .populate('updatedBy', 'name');
  }

  async findByEmail(email: string): Promise<boolean> {
    const student = await this.model.findOne({ email });

    return student !== null ? true : false;
  }

  async findByRegisterNumber(register_number: number): Promise<boolean> {
    const student = await this.model.findOne({
      register_number,
    });

    return student !== null ? true : false;
  }

  async findBySsn(ssn: string): Promise<boolean> {
    const student = await this.model.findOne({
      ssn,
    });

    return student !== null ? true : false;
  }

  async update(id: string, data: UpdateStudentDto): Promise<UpdateResult> {
    return this.model.updateOne(
      {
        _id: id,
      },
      {
        ...data,
        $set: { updatedBy: data.user },
      },
    );
  }

  async incrementLoans(id: string) {
    return this.model.updateOne(
      {
        _id: id,
      },
      {
        $inc: { number_of_loans: 1 },
      },
    );
  }
}
