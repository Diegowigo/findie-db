import { Injectable } from '@nestjs/common';
import { KlaviyoService } from '../klaviyo/klaviyo.service';
import { SesService } from '../ses/ses.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly klaviyoService: KlaviyoService,
    private readonly sesService: SesService,
  ) {}

  async sendTemplateEmail(templateId: string, email: string, subject: string) {
    const html = await this.klaviyoService.getTemplateHtml(templateId);

    const params = {
      email: email,
      subject: subject,
      html: html,
    };

    return this.sesService.sendMail(params);
  }
}
