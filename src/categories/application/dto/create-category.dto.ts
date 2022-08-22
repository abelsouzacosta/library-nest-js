import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString({
    message: 'name should be a string',
  })
  @IsNotEmpty({
    message: 'name should be provided',
  })
  name: string;

  user: string;
}
