import {
  IsObject,
  IsString,
  IsBoolean,
  IsNumber,
  IsArray,
  IsNotEmpty,
  IsMongoId,
} from 'class-validator';

class ProjectPriceProductsDto {
  @IsNumber()
  total: number;

  @IsArray()
  list: any[];
}

class ProjectPriceDto {
  @IsObject()
  products: ProjectPriceProductsDto;

  @IsNumber()
  subtotal: number;

  @IsNumber()
  search_amount: number;

  @IsNumber()
  findie_fee: number;

  @IsNumber()
  sii_tax: number;

  @IsNumber()
  external_fee: number;

  @IsNumber()
  total: number;
}

class ProjectProfitsDto {
  @IsNumber()
  freelancers: number;

  @IsNumber()
  client: number;

  @IsNumber()
  others: number;

  @IsNumber()
  total: number;
}

export class CreateProjectDto {
  @IsObject()
  price: ProjectPriceDto;

  @IsObject()
  profits: ProjectProfitsDto;

  @IsString()
  evaluation_status: string;

  @IsString()
  project_status: string;

  @IsArray()
  staff: any[];

  @IsArray()
  payments: any[];

  @IsBoolean()
  with_currency: boolean;

  @IsBoolean()
  is_brief_incomplete: boolean;

  @IsBoolean()
  has_offers: boolean;

  @IsString()
  client: string;

  @IsString()
  brief: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  freelancer_id: string;
}
