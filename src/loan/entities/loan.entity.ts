import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from 'src/books/entities/book.entity';
import { Student } from 'src/students/entities/student.entity';

@Schema({
  timestamps: false,
  collection: 'loans',
})
export class Loan {
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Student' })
  student: Student;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Book' })
  book: Book;

  @Prop({ required: true, type: String })
  loan_date: string;

  @Prop({ required: true, type: String })
  devolution_date: string;

  @Prop({ required: false, type: String })
  renewal_date?: string;

  @Prop({ required: false, type: Number, default: 0 })
  renewal_times?: number;

  @Prop({ required: false, type: String })
  observations?: string;
}

export const LoanSchema = SchemaFactory.createForClass(Loan);
