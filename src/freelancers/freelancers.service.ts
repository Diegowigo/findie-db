import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Freelancer } from './entities/freelancer.entity';
import { CreateFreelancerDto } from './dto/create-freelancer.dto';
import { UpdateFreelancerDto } from './dto/update-freelancer.dto';

@Injectable()
export class FreelancersService {
  constructor(@InjectModel(Freelancer.name) private freelancerModel: Model<Freelancer>) {}

  async create(createFreelancerDto: CreateFreelancerDto): Promise<Freelancer> {
    return this.freelancerModel.create(createFreelancerDto);
  }

  async findAll(): Promise<Freelancer[]> {
    return this.freelancerModel.find().populate('projects').exec();
  }

  async findOne(id: string): Promise<Freelancer> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID: "${id}"`);
    }
  
    const freelancer = await this.freelancerModel.findById(id).populate('projects').exec();
    if (!freelancer) {
      throw new NotFoundException(`Freelancer with ID "${id}" not found`);
    }
    return freelancer;
  }

  async findByFilters(filters: { specialty?: string; availability?: string }): Promise<Freelancer[]> {
    const query: Record<string, any> = {};

    if (filters.specialty) {
      query.specialty = filters.specialty;
    }

    if (filters.availability) {
      query.availability = filters.availability;
    }

    return this.freelancerModel.find(query).populate('projects').exec();
  }

  async update(id: string, updateFreelancerDto: UpdateFreelancerDto): Promise<Freelancer> {
    const updatedFreelancer = await this.freelancerModel
      .findByIdAndUpdate(id, updateFreelancerDto, { new: true })
      .populate('projects')
      .exec();
    if (!updatedFreelancer) {
      throw new NotFoundException(`Freelancer with ID "${id}" not found`);
    }
    return updatedFreelancer;
  }

  async remove(id: string): Promise<{ message: string; freelancer: Freelancer }> {
    const result = await this.freelancerModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Freelancer with ID "${id}" not found.`);
    }
    return { message: 'Freelancer deleted', freelancer: result };
  }
}