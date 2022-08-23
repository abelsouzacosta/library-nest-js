import { UpdateWriteOpResult } from 'mongoose';
import { CreateLoanDto } from 'src/loan/application/dto/create-loan.dto';
import { LoanRenewalDto } from 'src/loan/application/dto/loan-renewal.dto';
import { Loan } from 'src/loan/entities/loan.entity';

export interface ILoanRepository {
  create(data: CreateLoanDto): Promise<Loan>;

  find(): Promise<Array<Loan>>;

  findById(id: string): Promise<Loan>;

  makeRenew(id: string, data: LoanRenewalDto): Promise<UpdateWriteOpResult>;
}
