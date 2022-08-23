import { Injectable } from '@nestjs/common';
import { CreateLoanDto } from './application/dto/create-loan.dto';
import { LoanRenewalDto } from './application/dto/loan-renewal.dto';
import { LoanRepository } from './domain/repositories/loan.repository';

@Injectable()
export class LoanService {
  constructor(private readonly repository: LoanRepository) {}

  create(data: CreateLoanDto) {
    return this.repository.create(data);
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
