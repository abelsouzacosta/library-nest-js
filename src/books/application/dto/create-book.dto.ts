import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateBookDto {
  @IsString({
    message: 'title should be a string',
  })
  @IsNotEmpty({
    message: 'title should be provided',
  })
  title: string;

  @IsString({
    message: 'description should be a string',
  })
  @IsNotEmpty({
    message: 'description should be provided',
  })
  description: string;

  @IsString({
    message: 'total_pages should be a string',
  })
  @IsNotEmpty({
    message: 'total_pages should be provided',
  })
  total_pages: string;

  @IsString({
    message: 'isbn should be a string',
  })
  @IsNotEmpty({
    message: 'isbn should be provided',
  })
  isbn: string;

  @IsArray({
    message: 'authors should be an array',
  })
  @IsNotEmpty({
    message: 'authors should be provided',
  })
  authors: mongoose.Types.ObjectId[];
}
