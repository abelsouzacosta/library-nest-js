import { UpdateWriteOpResult } from 'mongoose';
import { LoanRenewalDto } from 'src/loan/application/dto/loan-renewal.dto';
import { SetLoanDTO } from 'src/loan/application/dto/set-loan.dto';
import { Loan } from 'src/loan/entities/loan.entity';

export interface ILoanRepository {
  create(data: SetLoanDTO): Promise<Loan>;

  find(): Promise<Array<Loan>>;

  findById(id: string): Promise<Loan>;

  makeRenew(id: string, data: LoanRenewalDto): Promise<UpdateWriteOpResult>;
}
