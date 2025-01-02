import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.productModel.create(createProductDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(`A product with the name "${createProductDto.name}" already exists.`);
      }
      throw new InternalServerErrorException('An error occurred while creating the product.');
    }
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found.`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      const updatedProduct = await this.productModel
        .findByIdAndUpdate(id, updateProductDto, { new: true })
        .exec();
      if (!updatedProduct) {
        throw new NotFoundException(`Product with ID "${id}" not found.`);
      }
      return updatedProduct;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(`A product with a similar name already exists.`);
      }
      throw new InternalServerErrorException('An error occurred while updating the product.');
    }
  }

  async remove(id: string): Promise<{ message: string, product: Product }> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Product with ID "${id}" not found.`);
    }
    return { message: 'Product deleted', product: result };
  }
}
