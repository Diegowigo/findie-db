import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { FreelancersService } from './freelancers.service';
import { CreateFreelancerDto } from './dto/create-freelancer.dto';
import { UpdateFreelancerDto } from './dto/update-freelancer.dto';
import { Freelancer } from './entities/freelancer.entity';

@Controller('freelancers')
export class FreelancersController {
  constructor(private readonly freelancersService: FreelancersService) {}

  @Post()
  async create(@Body() createFreelancerDto: CreateFreelancerDto): Promise<Freelancer> {
    return this.freelancersService.create(createFreelancerDto);
  }

  @Get()
  async findAll(): Promise<Freelancer[]> {
    return this.freelancersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Freelancer> {
    return this.freelancersService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFreelancerDto: UpdateFreelancerDto,
  ): Promise<Freelancer> {
    return this.freelancersService.update(id, updateFreelancerDto);
  }

  @Delete(':id')
  async deleteFreelancer(@Param('id') id: string): Promise<{ message: string; freelancer: Freelancer }> {
    return this.freelancersService.remove(id);
  }
}