import { IsEmail, IsISO8601, IsNotEmpty, IsString } from 'class-validator';

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

  @IsISO8601({
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

  @IsString({
    message: 'register_number should be a string',
  })
  @IsNotEmpty({
    message: 'register_number should be provided',
  })
  register_number: string;

  age: number;
}
