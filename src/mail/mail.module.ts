import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule], // Permite usar variables de entorno
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'), // SMTP host desde .env
          port: configService.get<number>('MAIL_PORT'), // SMTP port desde .env
          secure: configService.get<boolean>('MAIL_SECURE'), // Define si usa SSL/TLS
          auth: {
            user: configService.get<string>('MAIL_USER'), // Usuario SMTP desde .env
            pass: configService.get<string>('MAIL_PASSWORD'), // Contraseña SMTP desde .env
          },
        },
        defaults: {
          from: `"${configService.get<string>('MAIL_FROM_NAME')}" <${configService.get<string>('MAIL_FROM_EMAIL')}>`,
        },
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService], // Inyecta el ConfigService para acceder a .env
    }),
  ],
})
export class MailModule {}