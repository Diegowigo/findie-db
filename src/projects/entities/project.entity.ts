import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ProjectPrice, ProjectProfits } from '../interfaces/project.interface';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ type: Object, required: true })
  price: ProjectPrice;

  @Prop({ type: Object, required: true })
  profits: ProjectProfits;

  @Prop({ required: true })
  evaluation_status: string;

  @Prop({ required: true })
  project_status: string;

  @Prop({ type: Array, default: [] })
  staff: any[];

  @Prop({ type: Array, default: [] })
  payments: any[];

  @Prop({ required: true })
  with_currency: boolean;

  @Prop({ required: true })
  is_brief_incomplete: boolean;

  @Prop({ required: true })
  has_offers: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  })
  client: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  brief: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Freelancer',
    required: true,
  })
  freelancer_id: mongoose.Schema.Types.ObjectId;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
