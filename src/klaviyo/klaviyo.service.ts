import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

@Injectable()
export class KlaviyoService {
  private readonly apiKey = process.env.KLAVIYO_API_KEY;
  private readonly baseUrl = 'https://a.klaviyo.com/api';
  private readonly revision = '2023-12-15';

  async listTemplates() {
    try {
      if (!this.apiKey) {
        throw new HttpException(
          'Internal configuration error: Klaviyo API key is missing.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const response = await axios.get(`${this.baseUrl}/templates`, {
        headers: {
          Authorization: `Klaviyo-API-Key ${this.apiKey}`,
          'Content-Type': 'application/json',
          Revision: this.revision,
        },
      });

      return response.data.data.map((template) => ({
        id: template.id,
        name: template.attributes.name,
      }));
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTemplateHtml(templateId: string): Promise<string> {
    try {
      if (!this.apiKey) {
        throw new HttpException(
          'Internal configuration error: Klaviyo API key is missing.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const url = `${this.baseUrl}/templates/${templateId}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Klaviyo-API-Key ${this.apiKey}`,
          'Content-Type': 'application/json',
          Revision: this.revision,
        },
      });

      return response.data.data.attributes.html;
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
            message: 'Error communicating with Klaviyo',
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
