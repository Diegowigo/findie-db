import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class SendMailDto {
  @IsString()
  @IsNotEmpty()
  templateId: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  subject: string;
}
