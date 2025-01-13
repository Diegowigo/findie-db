import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentsService.createPayment(createPaymentDto);
  }

  @Get()
  async findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Payment> {
    return this.paymentsService.findOne(id);
  }

  @Put(':id')
  async updatePayment(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    return this.paymentsService.updatePayment(id, updatePaymentDto);
  }

  @Delete(':id')
  async deletePayment(@Param('id') id: string): Promise<{ message: string; payment: Payment }> {
    return this.paymentsService.deletePayment(id);
  }
}