import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FreelancersService } from './freelancers.service';
import { FreelancersController } from './freelancers.controller';
import { Freelancer, FreelancerSchema } from './entities/freelancer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Freelancer.name, schema: FreelancerSchema }]),
  ],
  controllers: [FreelancersController],
  providers: [FreelancersService],
})
export class FreelancersModule {}