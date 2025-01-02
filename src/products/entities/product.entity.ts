import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], default: [] })
  core_deriverables: string[];

  @Prop({ type: [String], default: [] })
  add_ons: string[];

  @Prop({
    type: {
      junior: { type: String, required: true },
      mid: { type: String, required: true },
      senior: { type: String, required: true },
    },
  })
  cost_ranges: {
    junior: string;
    mid: string;
    senior: string;
  };

  @Prop({ required: true })
  client_details_needed: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
