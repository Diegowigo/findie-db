import { Document } from 'mongoose';

export interface ProjectPriceProducts {
  total: number;
  list: any[];
}

export interface ProjectPrice {
  products: ProjectPriceProducts;
  subtotal: number;
  search_amount: number;
  findie_fee: number;
  sii_tax: number;
  external_fee: number;
  total: number;
}

export interface ProjectProfits {
  freelancers: number;
  client: number;
  others: number;
  total: number;
}

export interface Project extends Document {
  price: ProjectPrice;
  profits: ProjectProfits;
  evaluation_status: string;
  project_status: string;
  staff: any[];
  payments: any[];
  with_currency: boolean;
  is_brief_incomplete: boolean;
  has_offers: boolean;
  _id: string;
  created_at: number;
  client: string;
  __v: number;
  brief: string;
}
