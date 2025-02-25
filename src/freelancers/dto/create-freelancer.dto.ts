import {
  IsString,
  IsBoolean,
  IsNumber,
  IsObject,
  IsArray,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class CreateFreelancerDto {
  @IsObject()
  address: {
    country: string;
    city: string;
  };

  @IsObject()
  plan: {
    _id: string;
    name: string;
    price: number;
    price_type: string;
    fee: number;
    is_monthly_pay_out: boolean;
    is_price_affect_project: boolean;
  };

  @IsObject()
  cv: {
    file_name: string;
    url: string;
  };

  @IsObject()
  portfolio: {
    file_name: string;
    url: string;
  };

  @IsObject()
  avatar: {
    file_name: string;
    url: string;
  };

  @IsObject()
  featured_status: {
    is_featured: boolean;
    has_featured_icon: boolean;
    position: number;
    position_date: number;
  };

  @IsObject()
  proposed_options: {
    skills: unknown[];
  };

  @IsArray()
  skills: {
    _id: string;
    name: string;
    category: string;
  }[];

  @IsBoolean()
  is_featured_postulation: boolean;

  @IsString()
  postulation_status: string;

  @IsString()
  freelancer_status: string;

  @IsBoolean()
  is_hidden: boolean;

  @IsBoolean()
  is_available_to_work: boolean;

  @IsArray()
  simple_tickets: unknown[];

  @IsArray()
  current_projects: unknown[];

  @IsBoolean()
  was_invited: boolean;

  @IsBoolean()
  is_foreign: boolean;

  @IsBoolean()
  has_user_profile: boolean;

  @IsObject()
  category: {
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
    image: string;
  };

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  portfolio_link: string;

  @IsString()
  experience_level: string;

  @IsArray()
  studies: {
    _id: string;
    position: number;
    institution: string;
    degree: string;
    description: string;
  }[];

  @IsArray()
  experiences: {
    _id: string;
    position: number;
    rol: string;
    description: string;
    link: string;
  }[];

  @IsArray()
  portfolio_files: {
    _id: string;
    column: string;
    files: {
      _id: string;
      name: string;
      url: string;
      position: number;
    }[];
  }[];

  @IsString()
  biography: string;

  @IsString()
  college_degree: string;

  @IsOptional()
  @IsNumber()
  birthdate?: number;

  @IsNumber()
  hour_cost: number;

  @IsString()
  invitation_ticket: string;

  @IsString()
  nationality: string;

  @IsString()
  interview_info: string;

  @IsString()
  portfolio_avatar: string;

  @IsString()
  contact_preference: string;
}
