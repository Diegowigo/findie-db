import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(to: string, username: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Bienvenido a nuestra plataforma',
      template: './welcome',
      context: {
        username,
      },
    });
  }

  async sendCustomEmail(to: string, subject: string, message: string) {
    await this.mailerService.sendMail({
      to,
      subject,
      text: message,
    });
  }
}
