import { IsArray, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class AddAuthorsDto {
  @IsArray({
    message: 'authors should be an array',
  })
  @IsNotEmpty({
    message: 'authors should be provided',
  })
  authors: mongoose.Types.ObjectId[];

  user: string;
}
