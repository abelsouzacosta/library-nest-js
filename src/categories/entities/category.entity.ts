import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from '../../books/entities/book.entity';

@Schema({
  timestamps: true,
  collection: 'categories',
})
export class Category {
  @Prop({ required: true, type: String, unique: true })
  name: string;

  @Prop({ required: true, type: [mongoose.Types.ObjectId], ref: 'Book' })
  books: Book[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
