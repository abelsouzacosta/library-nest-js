import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsString({
    message: 'name should be a string',
  })
  @IsNotEmpty({
    message: 'name should be provided',
  })
  name: string;
}
