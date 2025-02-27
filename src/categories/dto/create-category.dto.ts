import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  is_available?: boolean;

  @IsOptional()
  @IsBoolean()
  is_link_required?: boolean;

  @IsOptional()
  @IsBoolean()
  is_other_category?: boolean;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  portfolio?: {
    isRequired: boolean;
    should_render: boolean;
  };
}
