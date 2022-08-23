import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateResult } from 'mongodb';
import { Model } from 'mongoose';
import { CreateLoanDto } from 'src/loan/application/dto/create-loan.dto';
import { LoanRenewalDto } from 'src/loan/application/dto/loan-renewal.dto';
import { Loan } from 'src/loan/entities/loan.entity';
import { ILoanRepository } from 'src/loan/infra/interfaces/loan-repository.interface';

@Injectable()
export class LoanRepository implements ILoanRepository {
  constructor(
    @InjectModel(Loan.name)
    private readonly model: Model<Loan>,
  ) {}

  async create(data: CreateLoanDto): Promise<Loan> {
    return this.model.create(data);
  }

  async find(): Promise<Loan[]> {
    return this.model.find();
  }

  async findById(id: string): Promise<Loan> {
    return this.model.findById(id);
  }

  async makeRenew(id: string, data: LoanRenewalDto): Promise<UpdateResult> {
    return this.model.updateOne(
      {
        _id: id,
      },
      {
        ...data,
        $inc: { renewal_times: 1 },
      },
    );
  }
}
