import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Loan, LoanSchema } from './entities/loan.entity';
import { LoanRepository } from './domain/repositories/loan.repository';
import { StudentsModule } from 'src/students/students.module';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Loan.name, schema: LoanSchema }]),
    StudentsModule,
    BooksModule,
  ],
  controllers: [LoanController],
  providers: [LoanService, LoanRepository],
})
export class LoanModule {}
