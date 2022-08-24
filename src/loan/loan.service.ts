import { Injectable } from '@nestjs/common';
import { CreateLoanDto } from './application/dto/create-loan.dto';
import { LoanRenewalDto } from './application/dto/loan-renewal.dto';
import { LoanRepository } from './domain/repositories/loan.repository';

@Injectable()
export class LoanService {
  constructor(private readonly repository: LoanRepository) {}

  async create({
    student,
    books,
    loan_date,
    devolution_date,
    observations,
  }: CreateLoanDto) {
    const responses = [];

    for (const book of books) {
      const response = await this.repository.create({
        student,
        book,
        loan_date,
        devolution_date,
        observations,
      });

      responses.push(response);
    }

    return responses;
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findById(id);
  }

  makeRenew(id: string, data: LoanRenewalDto) {
    return this.repository.makeRenew(id, data);
  }
}
