import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

@Injectable()
export class NotificationsService {
  private readonly apiKey = process.env.KLAVIYO_API_KEY;
  private readonly baseUrl = 'https://a.klaviyo.com/api/v1';

  async sendEmail(templateId: string, email: string, data: [string]) {
    try {
      if (!this.apiKey) {
        throw new HttpException(
          'Internal configuration error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const response = await axios.post(
        `${this.baseUrl}/email/send/`,
        {
          templateId,
          email,
          data,
        },
        {
          headers: {
            Authorization: `Klaviyo-API-Key ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        const { status, data } = axiosError.response;
        throw new HttpException(
          {
            message: 'Error sending email to Klaviyo',
            statusCode: status,
            details: data,
          },
          status,
        );
      } else if (axiosError.request) {
        throw new HttpException(
          {
            message: 'Could not connect to Klaviyo',
            statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          },
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
    }

    throw new HttpException(
      {
        message: 'Unexpected error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
