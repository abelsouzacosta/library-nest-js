import { Injectable } from '@nestjs/common';
import { CreateLoanDto } from './application/dto/create-loan.dto';

@Injectable()
export class LoanService {
  create(data: CreateLoanDto) {
    return 'This action adds a new loan';
  }

  findAll() {
    return `This action returns all loan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loan`;
  }
}
