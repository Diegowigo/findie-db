import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly NotificationsService: NotificationsService) {}

  @Post('email')
  async sendNotification(@Body() body: { templateId: string; email: string; data: Record<string, any> }) {
    const { templateId, email, data } = body;
    return this.NotificationsService.sendEmail(templateId, email, data);
  }
}
