import { IsString, IsArray, IsNotEmpty, ValidateNested, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

class ContactDetailsDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @Type(() => ContactDetailsDto)
  contact_details: ContactDetailsDto;

  @IsString()
  @IsNotEmpty()
  company_info: string;

  @IsArray()
  @IsString({ each: true })
  projects: string[];
}