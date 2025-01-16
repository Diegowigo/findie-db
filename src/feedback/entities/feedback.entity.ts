import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Feedback extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
  client_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  project_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Freelancer', required: true })
  freelancer_id: Types.ObjectId;

  @Prop({ type: String, required: true })
  feedback: string;

  @Prop({ type: String, required: false })
  url?: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
