import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './entities/payment.entity';
import { Project } from '../projects/entities/project.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { stage, amount, project_id } = createPaymentDto;

    const project = await this.projectModel.findById(project_id);
    if (!project) {
      throw new NotFoundException(`Project with ID "${project_id}" not found`);
    }

    const payment = new this.paymentModel({ stage, amount, project_id });
    await payment.save();

    project.payment_per_stage.push({ stage, amount });
    await project.save();

    return payment;
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.find().populate('project_id').exec();
  }

  async findOne(paymentId: string): Promise<Payment> {
    const payment = await this.paymentModel.findById(paymentId).populate('project_id').exec();
    if (!payment) {
      throw new NotFoundException(`Payment with ID "${paymentId}" not found`);
    }
    return payment;
  }

  async updatePayment(paymentId: string, updateDto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.paymentModel.findById(paymentId);
    if (!payment) {
      throw new NotFoundException(`Payment with ID "${paymentId}" not found`);
    }

    if (updateDto.stage) payment.stage = updateDto.stage;
    if (updateDto.amount) payment.amount = updateDto.amount;
    await payment.save();

    const project = await this.projectModel.findById(payment.project_id);
    if (!project) {
      throw new NotFoundException(`Project with ID "${payment.project_id}" not found`);
    }

    const stageIndex = project.payment_per_stage.findIndex(
      (p) => p.stage === payment.stage,
    );
    if (stageIndex !== -1) {
      project.payment_per_stage[stageIndex] = {
        stage: payment.stage,
        amount: payment.amount,
      };
      await project.save();
    }

    return payment;
  }

  async deletePayment(paymentId: string): Promise<{ message: string; payment: Payment }> {
    const payment = await this.paymentModel.findById(paymentId);
    if (!payment) {
      throw new NotFoundException(`Payment with ID "${paymentId}" not found`);
    }

    await this.paymentModel.findByIdAndDelete(paymentId);

    const project = await this.projectModel.findById(payment.project_id);
    if (project) {
      project.payment_per_stage = project.payment_per_stage.filter(
        (p) => p.stage !== payment.stage,
      );
      await project.save();
    }

    return { message: 'Payment deleted', payment };
  }
}