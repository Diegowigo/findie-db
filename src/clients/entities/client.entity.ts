import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Client extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
      _id: false,
    }
  })
  contact_details: {
    email: string;
    phone: string;
  };

  @Prop()
  company_info: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Project', default: [] })
  projects: mongoose.Schema.Types.ObjectId[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);