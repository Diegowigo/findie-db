import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('email')
  async sendNotification(
    @Body() body: { templateId: string; email: string; data: [string] },
  ) {
    const { templateId, email, data } = body;

    if (!templateId || !email || !data) {
      throw new HttpException(
        'Template ID, email, and data are required.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.notificationsService.sendEmail(templateId, email, data);
  }
}