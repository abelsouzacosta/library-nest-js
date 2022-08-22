import { ArrayNotEmpty, IsArray } from 'class-validator';
import mongoose from 'mongoose';

export class AddBoookToCategoryDto {
  @IsArray({
    message: 'books_id must be an array',
  })
  @ArrayNotEmpty()
  books: mongoose.Types.ObjectId[];

  user: string;
}
