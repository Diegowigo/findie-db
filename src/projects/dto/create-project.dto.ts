import { IsString, IsArray, IsOptional, IsNotEmpty, ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

export class PaymentStageDto {
  @IsString()
  @IsNotEmpty()
  stage: string;

  @IsString()
  @IsNotEmpty()
  amount: string;
}

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  deliverables_by_status?: string[];

  @IsString()
  @IsOptional()
  investment?: string;

  @IsString()
  @IsOptional()
  start_preference?: string;

  @IsString()
  @IsOptional()
  work_preference?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  specific_requirements?: string[];

  @IsString()
  @IsOptional()
  inspiration_links?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  inspiration_images?: string[];

  @IsString()
  @IsOptional()
  inspiration_text?: string;

  @IsString()
  @IsOptional()
  @IsMongoId()
  product_id?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  selected_deliverables?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentStageDto)
  @IsOptional()
  payment_per_stage?: PaymentStageDto[];

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  client_id: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  freelancer_id: string;
}