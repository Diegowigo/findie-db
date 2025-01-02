import {
    IsString,
    IsArray,
    IsNotEmpty,
    ValidateNested,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  class CostRangesDto {
    @IsString()
    @IsNotEmpty()
    junior: string;
  
    @IsString()
    @IsNotEmpty()
    mid: string;
  
    @IsString()
    @IsNotEmpty()
    senior: string;
  }
  
  export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsArray()
    @IsString({ each: true })
    core_deriverables: string[];
  
    @IsArray()
    @IsString({ each: true })
    add_ons: string[];
  
    @ValidateNested()
    @Type(() => CostRangesDto)
    cost_ranges: CostRangesDto;
  
    @IsString()
    @IsNotEmpty()
    client_details_needed: string;
  }