import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
      return this.clientModel.create(createClientDto);
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel.find().populate('projects').exec();
  }

  async findOne(id: string): Promise<Client> {
      const client = await this.clientModel.findById(id).populate('projects').exec();
      if (!client) {
        throw new NotFoundException(`Client with ID "${id}" not found`);
      }
      return client;
    }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
      const updatedClient = await this.clientModel
        .findByIdAndUpdate(id, updateClientDto, { new: true })
        .populate('projects')
        .exec();
      if (!updatedClient) {
        throw new NotFoundException(`Project with ID "${id}" not found`);
      }
      return updatedClient;
    }

  async remove(id: string): Promise<{ message: string, client: any }> {
    const result = await this.clientModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Client with ID "${id}" not found.`);
    }
    return { message: 'Client deleted', client: result };
  }
}