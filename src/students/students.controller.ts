import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './application/dto/create-student.dto';
import { UpdateStudentDto } from './application/dto/update-student.dto';
import { GetStudentAgePipe } from './domain/pipes/get-student-age.pipe';
import { ParseStringDatePipe } from './domain/pipes/parse-string-date.pipe';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @UsePipes(ValidationPipe, ParseStringDatePipe, GetStudentAgePipe)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateStudentDto) {
    return this.studentsService.create(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe, ParseStringDatePipe, GetStudentAgePipe)
  @HttpCode(HttpStatus.CREATED)
  update(@Param('id') id: string, @Body() data: UpdateStudentDto) {
    return this.studentsService.update(id, data);
  }
}
