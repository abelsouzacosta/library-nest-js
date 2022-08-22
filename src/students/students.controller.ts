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
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './application/dto/create-student.dto';
import { UpdateStudentDto } from './application/dto/update-student.dto';
import { GetStudentAgePipe } from './domain/pipes/get-student-age.pipe';
import { ParseStringDatePipe } from './domain/pipes/parse-string-date.pipe';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { CheckEmailAlreadyTakenPipe } from './domain/pipes/check-email-already-taken.pipe';
import { CheckRegisterNumberAlreadyTakenPipe } from './domain/pipes/check-register-number-already-taken.pipe';

@Controller('students')
@UseGuards(AuthGuard())
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @UsePipes(
    ValidationPipe,
    CheckEmailAlreadyTakenPipe,
    CheckRegisterNumberAlreadyTakenPipe,
    ParseStringDatePipe,
    GetStudentAgePipe,
  )
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
  @UsePipes(
    ValidationPipe,
    CheckEmailAlreadyTakenPipe,
    ParseStringDatePipe,
    GetStudentAgePipe,
  )
  @HttpCode(HttpStatus.CREATED)
  update(@Param('id') id: string, @Body() data: UpdateStudentDto) {
    return this.studentsService.update(id, data);
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  import(
    @UploadedFile('file')
    file: Express.Multer.File,
  ) {
    return this.studentsService.import(file);
  }
}
