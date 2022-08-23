import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './application/dto/create-loan.dto';
import { LoanRenewalDto } from './application/dto/loan-renewal.dto';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  create(@Body() data: CreateLoanDto) {
    return this.loanService.create(data);
  }

  @Get()
  findAll() {
    return this.loanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loanService.findOne(id);
  }

  @Patch(':id')
  makeRenew(@Param('id') id: string, @Body() body: LoanRenewalDto) {
    return this.loanService.makeRenew(id, body);
  }
}
