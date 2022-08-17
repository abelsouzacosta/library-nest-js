import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
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
