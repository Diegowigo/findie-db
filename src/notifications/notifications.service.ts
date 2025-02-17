import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { KlaviyoService } from '../klaviyo/klaviyo.service';

@Injectable()
export class NotificationsService {
  private ses: AWS.SES;

  constructor(
    private readonly configService: ConfigService,
    private readonly klaviyoService: KlaviyoService,
  ) {
    this.ses = new AWS.SES({
      accessKeyId: this.configService.get<string>('ACCESS_KEY'),
      secretAccessKey: this.configService.get<string>('SECRET_KEY'),
      region: this.configService.get<string>('AWS_REGION'),
    });
  }

  async sendTemplateEmail(templateId: string, email: string, subject: string) {
    const html = await this.klaviyoService.getTemplateHtml(templateId);

    const params = {
      email: email,
      subject: subject,
      html: html,
    };

    return this.sendMail(params);
  }

  private async sendMail(params: {
    email: string | string[];
    subject: string;
    html: string;
  }) {
    const opts: AWS.SES.SendEmailRequest = {
      Source: `Findie <contacto@findie.cl>`,
      Destination: {
        ToAddresses: Array.isArray(params.email)
          ? params.email
          : [params.email],
      },
      ReplyToAddresses: ['contacto@findie.cl'],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: params.html,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: params.subject,
        },
      },
    };

    try {
      const res = await this.ses.sendEmail(opts).promise();
      return res;
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}
