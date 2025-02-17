import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendMailDto } from './dto/create-notifications.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('send-email')
  async sendTemplateEmail(@Body() body: SendMailDto) {
    return this.notificationsService.sendTemplateEmail(
      body.templateId,
      body.email,
      body.subject,
    );
  }
}
