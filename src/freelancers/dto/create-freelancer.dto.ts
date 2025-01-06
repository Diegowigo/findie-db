import { IsString, IsNotEmpty, IsArray, IsOptional, IsObject, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class RateDto {
  @IsNumber()
  @IsNotEmpty()
  junior: number;

  @IsNumber()
  @IsNotEmpty()
  mid: number;

  @IsNumber()
  @IsNotEmpty()
  senior: number;
}

export class CreateFreelancerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  specialty: string;

  @IsString()
  @IsNotEmpty()
  availability: string;

  @IsObject()
  @ValidateNested()
  @Type(() => RateDto)
  rate: RateDto;

  @IsArray()
  @IsOptional()
  projects?: string[];
}