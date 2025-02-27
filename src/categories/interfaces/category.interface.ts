import { Document } from 'mongoose';

export interface CategoryPortfolio {
  isRequired: boolean;
  should_render: boolean;
}

export interface Category extends Document {
  portfolio: CategoryPortfolio;
  is_available: boolean;
  is_link_required: boolean;
  is_other_category: boolean;
  name: string;
  image?: string;
}
