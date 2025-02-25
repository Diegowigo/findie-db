import { IsString, IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  avatar_style: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  has_default_password: boolean;

  @IsBoolean()
  @IsNotEmpty()
  is_disabled: boolean;

  @IsBoolean()
  @IsNotEmpty()
  is_first_render: boolean;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  profile_id: string;

  @IsString()
  @IsNotEmpty()
  user_type: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
