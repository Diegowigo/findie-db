import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('send-email')
  async sendEmail(
    @Body()
    body: {
      templateId: string;
      email: string;
      data: Record<string, any>;
    },
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

  @Get('templates')
  async listTemplates() {
    return this.notificationsService.listTemplates();
  }
}
