import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Author } from '../../authors/entities/author.entity';

@Schema({
  timestamps: true,
  collection: 'books',
})
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  total_pages: string;

  @Prop({ required: true })
  isbn: string;

  @Prop({ required: true, type: [mongoose.Types.ObjectId], ref: 'Author' })
  authors: Author[];

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  createdBy: User;

  @Prop({ required: false, type: mongoose.Types.ObjectId, ref: 'User' })
  updatedBy?: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);
