import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateLoanDto {
  @IsString({
    message: 'student should be a string',
  })
  @IsNotEmpty({
    message: 'student should be provided',
  })
  student: string;

  @IsArray({
    message: 'books should be an array',
  })
  @IsString({
    message: 'instances inside books array should be of the type string',
    each: true,
  })
  @ArrayNotEmpty({
    message: 'books array should not be empty',
  })
  @MaxLength(5, {
    message: 'books should have maximum of 5 instances',
  })
  books: string[];

  @IsString({
    message: 'observations must be of the type string',
  })
  @IsOptional()
  observations: string;

  loan_date: string;

  devolution_date: string;

  renewal_date: string;
}
