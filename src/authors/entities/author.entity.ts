import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
