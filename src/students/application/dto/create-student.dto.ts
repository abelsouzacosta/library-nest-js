import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString({
    message: 'name should be a string',
  })
  @IsNotEmpty({
    message: 'name should be provided',
  })
  name: string;

  @IsString({
    message: 'email should be a string',
  })
  @IsEmail({
    message: 'should be a valid email',
  })
  @IsNotEmpty({
    message: 'email should be provided',
  })
  email: string;

  @IsString({
    message: 'date_birth should be a Date',
  })
  @IsNotEmpty({
    message: 'date_birth should be provided',
  })
  date_birth: Date;

  @IsString({
    message: 'ssn should be a string',
  })
  @IsNotEmpty({
    message: 'ssn should be provided',
  })
  ssn: string;

  @IsNumber({
    allowInfinity: false,
  })
  @IsNotEmpty({
    message: 'register_number should be provided',
  })
  register_number: number;

  age: number;
}
