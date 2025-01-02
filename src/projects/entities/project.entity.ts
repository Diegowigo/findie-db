import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  deliverables_by_status: string[];

  @Prop()
  investment: string;

  @Prop()
  start_preference: string;

  @Prop()
  work_preference: string;

  @Prop({ type: [String], default: [] })
  specific_requirements: string[];

  @Prop()
  inspiration_links: string;

  @Prop({ type: [String], default: [] })
  inspiration_images: string[];

  @Prop()
  inspiration_text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product_id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [String], default: [] })
  selected_deliverables: string[];

  @Prop({
    type: [
      {
        stage: { type: String },
        amount: { type: String },
        _id: false
      },
    ],
    default: [],
  })
  payment_per_stage: {
    stage: string;
    amount: string;
  }[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  client_id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  freelancer_id: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
