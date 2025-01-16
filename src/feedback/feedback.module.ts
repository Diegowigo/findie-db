import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { MongooseModule } from '@nestjs/mongoose'; 
import { Feedback, FeedbackSchema } from './entities/feedback.entity';
import { Client, ClientSchema } from 'src/clients/entities/client.entity';
import { Project, ProjectSchema } from 'src/projects/entities/project.entity';
import { Freelancer, FreelancerSchema } from 'src/freelancers/entities/freelancer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Feedback.name, schema: FeedbackSchema },
      { name: Client.name, schema: ClientSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Freelancer.name, schema: FreelancerSchema },
    ]),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
