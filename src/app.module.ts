import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { ProductsModule } from './products/products.module';
import { ClientsModule } from './clients/clients.module';
import { FreelancersModule } from './freelancers/freelancers.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), MongooseModule.forRoot(process.env.DATABASE_URL), ProjectsModule, ProductsModule, ClientsModule, FreelancersModule, PaymentsModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
