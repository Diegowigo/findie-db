import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreatePaymentDto {
    @IsString()
    @IsNotEmpty()
    stage: string;
  
    @IsString()
    @IsNotEmpty()
    amount: string;
  
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    project_id: string;
  }