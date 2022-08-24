import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema({
  timestamps: true,
  collection: 'students',
})
export class Student {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ required: true, type: String })
  date_birth: string;

  @Prop({ required: true, tyype: Number })
  age: number;

  @Prop({ required: true, type: String, unique: true })
  ssn: string;

  @Prop({ required: true, type: Number, unique: true })
  register_number: number;

  @Prop({ required: false, type: Number, default: 0 })
  number_of_loans?: number;

  @Prop({ required: false, type: mongoose.Types.ObjectId, ref: 'User' })
  createdBy?: User;

  @Prop({ required: false, type: mongoose.Types.ObjectId, ref: 'User' })
  updatedBy?: User;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
