import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema({
  timestamps: true,
  collection: 'authors',
})
export class Author {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  biography: string;

  @Prop({ required: true, type: Date })
  date_of_birth: Date;

  @Prop({ required: false, type: Date })
  date_of_death?: Date;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  createdBy: User;

  @Prop({ required: false, type: mongoose.Types.ObjectId, ref: 'User' })
  updatedBy?: User;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
