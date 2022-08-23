import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './application/dto/create-loan.dto';

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
    return this.loanService.findOne(+id);
  }
}
