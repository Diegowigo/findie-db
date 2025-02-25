import { Document } from 'mongoose';

export interface FreelancerAddress {
  country: string;
  city: string;
}

export interface FreelancerPlan {
  _id: string;
  name: string;
  price: number;
  price_type: string;
  fee: number;
  is_monthly_pay_out: boolean;
  is_price_affect_project: boolean;
}

export interface FreelancerFile {
  file_name: string;
  url: string;
}

export interface FreelancerFeaturedStatus {
  is_featured: boolean;
  has_featured_icon: boolean;
  position: number;
  position_date: number;
}

export interface FreelancerSkill {
  _id: string;
  name: string;
  createdAt: number;
  category: string;
  __v: number;
}

export interface FreelancerStudy {
  _id: string;
  position: number;
  institution: string;
  degree: string;
  description: string;
}

export interface FreelancerExperience {
  _id: string;
  position: number;
  rol: string;
  description: string;
  link: string;
}

export interface FreelancerPortfolioFile {
  _id: string;
  column: string;
  files: {
    _id: string;
    name: string;
    url: string;
    position: number;
  }[];
}

export interface FreelancerCategory {
  portfolio: {
    isRequired: boolean;
    should_render: boolean;
  };
  is_available: boolean;
  is_link_required: boolean;
  is_other_category: boolean;
  _id: string;
  name: string;
  createdAt: number;
  __v: number;
  image: string;
}

export interface Freelancer extends Document {
  _id: string;
  address: FreelancerAddress;
  plan: FreelancerPlan;
  cv: FreelancerFile;
  portfolio: FreelancerFile;
  avatar: FreelancerFile;
  featured_status: FreelancerFeaturedStatus;
  proposed_options: {
    skills: unknown[];
  };
  skills: FreelancerSkill[];
  is_featured_postulation: boolean;
  postulation_status: string;
  freelancer_status: string;
  is_hidden: boolean;
  is_available_to_work: boolean;
  simple_tickets: unknown[];
  current_projects: unknown[];
  was_invited: boolean;
  is_foreign: boolean;
  has_user_profile: boolean;
  createdAt: number;
  category: FreelancerCategory;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  portfolio_link: string;
  experience_level: string;
  studies: FreelancerStudy[];
  experiences: FreelancerExperience[];
  portfolio_files: FreelancerPortfolioFile[];
  __v: number;
  biography: string;
  college_degree: string;
  birthdate?: number;
  hour_cost: number;
  invitation_ticket: string;
  nationality: string;
  interview_info: string;
  portfolio_avatar: string;
  contact_preference: string;
}
