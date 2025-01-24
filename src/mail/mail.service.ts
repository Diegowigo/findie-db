import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(to: string, username: string) {
    await this.mailerService.sendMail({
      to, // Dirección del destinatario
      subject: 'Bienvenido a nuestra plataforma', // Asunto del correo
      template: './welcome', // Nombre del archivo de la plantilla (sin extensión)
      context: { // Datos dinámicos para la plantilla
        username,
      },
    });
  }

  async sendCustomEmail(to: string, subject: string, message: string) {
    await this.mailerService.sendMail({
      to,
      subject,
      text: message, // Contenido como texto plano
    });
  }
}
