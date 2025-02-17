import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { ProductsModule } from './products/products.module';
import { ClientsModule } from './clients/clients.module';
import { FreelancersModule } from './freelancers/freelancers.module';
import { PaymentsModule } from './payments/payments.module';
import { FeedbackModule } from './feedback/feedback.module';
import { NotificationsService } from './notifications/notifications.service';
import { NotificationsController } from './notifications/notifications.controller';
import { KlaviyoController } from './klaviyo/klaviyo.controller';
import { KlaviyoService } from './klaviyo/klaviyo.service';
import { SesService } from './ses/ses.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ProjectsModule,
    ProductsModule,
    ClientsModule,
    FreelancersModule,
    PaymentsModule,
    FeedbackModule,
  ],
  controllers: [NotificationsController, KlaviyoController],
  providers: [NotificationsService, KlaviyoService, SesService],
  exports: [],
})
export class AppModule {}
