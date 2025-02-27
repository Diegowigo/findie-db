import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface CategoryPortfolio {
  isRequired: boolean;
  should_render: boolean;
}

export interface Category {
  portfolio: CategoryPortfolio;
  is_available: boolean;
  is_link_required: boolean;
  is_other_category: boolean;
  name: string;
  image?: string;
}

export interface CategoryDocument extends Category, Document {}

@Schema({ timestamps: true })
export class Category extends Document implements Category {
  @Prop({ type: Object, required: true })
  portfolio: {
    isRequired: boolean;
    should_render: boolean;
  };

  @Prop({ required: true, default: true })
  is_available: boolean;

  @Prop({ required: true, default: false })
  is_link_required: boolean;

  @Prop({ required: true, default: false })
  is_other_category: boolean;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  image?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
