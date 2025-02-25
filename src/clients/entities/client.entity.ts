import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export interface User {
  avatar_style: string;
  email: string;
  has_default_password: boolean;
  is_disabled: boolean;
  is_first_render: boolean;
  last_name: string;
  name: string;
  profile_id: string;
  user_type: string;
  token: string;
}

export interface Client extends User, Document {}

@Schema({ timestamps: true })
export class Client extends Document implements Client {
  @Prop({ required: true })
  avatar_style: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  has_default_password: boolean;

  @Prop({ required: true })
  is_disabled: boolean;

  @Prop({ required: true })
  is_first_render: boolean;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  profile_id: string;

  @Prop({ required: true })
  user_type: string;

  @Prop({ required: true })
  token: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
