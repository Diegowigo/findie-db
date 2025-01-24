import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-welcome')
  async sendWelcome(@Body('email') email: string, @Body('username') username: string) {
    await this.mailService.sendWelcomeEmail(email, username);
    return { message: 'Correo enviado exitosamente!' };
  }

  @Post('send-custom')
  async sendCustom(@Body() body: { email: string; subject: string; message: string }) {
    const { email, subject, message } = body;
    await this.mailService.sendCustomEmail(email, subject, message);
    return { message: 'Correo enviado exitosamente!' };
  }
}