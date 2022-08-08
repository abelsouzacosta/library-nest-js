import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString({
    message: 'name should be a string',
  })
  @IsNotEmpty({
    message: 'name should be provided',
  })
  name: string;

  @IsString({
    message: 'biography should be a string',
  })
  @IsNotEmpty({
    message: 'biography should be provided',
  })
  biography: string;

  @IsDate({
    message: 'date_of_birth should be a date',
  })
  @IsNotEmpty({
    message: 'date_of_birth should be provided',
  })
  date_of_birth: Date;

  @IsDate({
    message: 'date_of_death should be a date',
  })
  @IsOptional()
  date_of_death?: string;
}
