import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  FreelancerAddress,
  FreelancerPlan,
  FreelancerFile,
  FreelancerFeaturedStatus,
  FreelancerSkill,
  FreelancerStudy,
  FreelancerExperience,
  FreelancerPortfolioFile,
  FreelancerCategory,
} from '../interfaces/freelancer.interface';

export type FreelancerDocument = Freelancer & Document;

@Schema({ timestamps: true })
export class Freelancer {
  @Prop({ type: Object, required: true })
  address: FreelancerAddress;

  @Prop({ type: Object, required: true })
  plan: FreelancerPlan;

  @Prop({ type: Object, required: true })
  cv: FreelancerFile;

  @Prop({ type: Object, required: true })
  portfolio: FreelancerFile;

  @Prop({ type: Object, required: true })
  avatar: FreelancerFile;

  @Prop({ type: Object, required: true })
  featured_status: FreelancerFeaturedStatus;

  @Prop({ type: Object, required: true })
  proposed_options: {
    skills: unknown[];
  };

  @Prop({ type: Array, required: true })
  skills: FreelancerSkill[];

  @Prop({ required: true })
  is_featured_postulation: boolean;

  @Prop({ required: true })
  postulation_status: string;

  @Prop({ required: true })
  freelancer_status: string;

  @Prop({ required: true })
  is_hidden: boolean;

  @Prop({ required: true })
  is_available_to_work: boolean;

  @Prop({ type: Array, default: [] })
  simple_tickets: unknown[];

  @Prop({ type: Array, default: [] })
  current_projects: unknown[];

  @Prop({ required: true })
  was_invited: boolean;

  @Prop({ required: true })
  is_foreign: boolean;

  @Prop({ required: true })
  has_user_profile: boolean;

  @Prop({ type: Object, required: true })
  category: FreelancerCategory;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  portfolio_link: string;

  @Prop({ required: true })
  experience_level: string;

  @Prop({ type: Array, required: true })
  studies: FreelancerStudy[];

  @Prop({ type: Array, required: true })
  experiences: FreelancerExperience[];

  @Prop({ type: Array, required: true })
  portfolio_files: FreelancerPortfolioFile[];

  @Prop({ required: true })
  biography: string;

  @Prop({ required: true })
  college_degree: string;

  @Prop()
  birthdate: number;

  @Prop({ required: true })
  hour_cost: number;

  @Prop({ required: true })
  invitation_ticket: string;

  @Prop({ required: true })
  nationality: string;

  @Prop({ required: true })
  interview_info: string;

  @Prop({ required: true })
  portfolio_avatar: string;

  @Prop({ required: true })
  contact_preference: string;
}

export const FreelancerSchema = SchemaFactory.createForClass(Freelancer);
