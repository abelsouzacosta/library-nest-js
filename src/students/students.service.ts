import { Injectable, Logger } from '@nestjs/common';
import { createReadStream, promises } from 'fs';
import { CreateStudentDto } from './application/dto/create-student.dto';
import { UpdateStudentDto } from './application/dto/update-student.dto';
import { StudentsRepository } from './domain/repositories/students.repository';
import { Student } from './entities/student.entity';
import { parse } from 'csv-parse';

@Injectable()
export class StudentsService {
  private students: Student[];

  constructor(private readonly repository: StudentsRepository) {
    this.students = [];
  }

  async loadStudents(file: Express.Multer.File): Promise<Array<Student>> {
    return new Promise((resolve, reject) => {
      const stream = createReadStream(file.path);

      const fileParser = parse({});

      stream.pipe(fileParser);

      fileParser
        .on('data', (line) => {
          const [name, email, date_birth, age, ssn, register_number] = line;

          this.students.push({
            name,
            email,
            date_birth,
            age,
            ssn,
            register_number,
          });
        })
        .on('end', () => {
          promises.unlink(file.path);
          resolve(this.students);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  async checkIfEmailAlreadyExists(email: string): Promise<boolean> {
    const emailAlreadyExists = await this.repository.findByEmail(email);

    return emailAlreadyExists;
  }

  async checkIfSsnAlreadyExists(ssn: string) {
    const ssnAlreadyExists = await this.repository.findBySsn(ssn);

    return ssnAlreadyExists;
  }

  async checkIfRegisterNumberAlreadyExists(register_number: number) {
    const registerNumberAlreadyExists =
      await this.repository.findByRegisterNumber(register_number);

    return registerNumberAlreadyExists;
  }

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

  async import(file: Express.Multer.File) {
    const students = await this.loadStudents(file);

    students.map(
      async ({ name, email, date_birth, age, ssn, register_number }) => {
        if (
          (await this.checkIfEmailAlreadyExists(email)) ||
          (await this.checkIfRegisterNumberAlreadyExists(register_number)) ||
          (await this.checkIfSsnAlreadyExists(ssn))
        ) {
          Logger.warn(
            `some information is duplicated, student ${name} will be ignored`,
          );
        } else
          await this.repository.create({
            name,
            email,
            date_birth,
            age,
            ssn,
            register_number,
          });
      },
    );
  }
}
