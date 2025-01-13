import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ required: true })
  stage: string;

  @Prop({ required: true })
  amount: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true })
  project_id: mongoose.Schema.Types.ObjectId;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
