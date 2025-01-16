import { IsNotEmpty, IsString, IsOptional, IsMongoId } from 'class-validator';

export class CreateFeedbackDto {
  @IsNotEmpty()
  @IsMongoId()
  client_id: string;

  @IsNotEmpty()
  @IsMongoId()
  project_id: string;

  @IsNotEmpty()
  @IsMongoId()
  freelancer_id: string;

  @IsNotEmpty()
  @IsString()
  feedback: string;

  @IsOptional()
  @IsString()
  url?: string;
}
