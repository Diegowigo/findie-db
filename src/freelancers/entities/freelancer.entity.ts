import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Freelancer extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  specialty: string;

  @Prop({ required: true })
  availability: string;

  @Prop({
    type: {
      junior: { type: Number, required: true },
      mid: { type: Number, required: true },
      senior: { type: Number, required: true },
      _id: false
    },
  })
  rate: {
    junior: number;
    mid: number;
    senior: number;
  };

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Project', default: [] })
  projects: mongoose.Schema.Types.ObjectId[];
}

export const FreelancerSchema = SchemaFactory.createForClass(Freelancer);