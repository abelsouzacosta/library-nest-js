import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
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

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  createdBy: User;

  @Prop({ required: false, type: mongoose.Types.ObjectId, ref: 'User' })
  updatedBy?: User;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
