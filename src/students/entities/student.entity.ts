import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  collection: 'students',
})
export class Student {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: Date })
  date_birth: Date;

  @Prop({ required: true, type: String })
  ssn: string;

  @Prop({ required: true, type: String })
  register_number: number;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
