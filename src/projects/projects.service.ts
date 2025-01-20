import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectModel.create(createProjectDto);
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel
      .find()
      .populate('product_id')
      .populate('client_id')
      .populate('freelancer_id')
      .exec();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectModel
      .findById(id)
      .populate('product_id')
      .populate('client_id')
      .populate('freelancer_id')
      .exec();
    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const updatedProject = await this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .populate('product_id')
      .populate('client_id')
      .populate('freelancer_id')
      .exec();
    if (!updatedProject) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return updatedProject;
  }

  async assignFreelancerToProject(
    projectId: string,
    freelancerId: string,
  ): Promise<Project> {
  
    if (!Types.ObjectId.isValid(freelancerId)) {
      throw new Error('Invalid freelancer ID');
    }
  
    const project = await this.projectModel.findById(projectId);
  
    if (!project) {
      throw new NotFoundException('Project not found');
    }
  
    project.freelancer_id = new (mongoose.Types.ObjectId as any)(freelancerId);
    project.status = 'In Progress';
  
    await project.save();
  
    return project;
  }
  

  async remove(id: string): Promise<{ message: string, project: Project }> {
    const result = await this.projectModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Project with ID "${id}" not found.`);
    }
    return { message: 'Project deleted', project: result };
  }
}