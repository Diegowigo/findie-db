import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { KlaviyoService } from '../klaviyo/klaviyo.service';

@Injectable()
export class NotificationsService {
  private transporter;

  constructor(private readonly klaviyoService: KlaviyoService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: 'diegowigodski@gmail.com',
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  }

  async sendKlaviyoTemplate(to: string, subject: string, templateId: string) {
    const html = await this.klaviyoService.getTemplateHtml(templateId);
    return this.sendMail(to, subject, html);
  }

  private async sendMail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: 'diegowigodski@gmail.com',
      to,
      subject,
      html,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
