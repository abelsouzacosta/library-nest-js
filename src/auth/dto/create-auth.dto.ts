import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString({
    message: 'email should be a string',
  })
  @IsNotEmpty({
    message: 'email should be provided',
  })
  @IsEmail()
  email: string;

  @IsString({
    message: 'password should be a string',
  })
  @IsNotEmpty({
    message: 'password should be provided',
  })
  password: string;
}
