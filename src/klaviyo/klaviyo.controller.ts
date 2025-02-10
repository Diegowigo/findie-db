import { Controller, Get } from '@nestjs/common';
import { KlaviyoService } from './klaviyo.service';

@Controller('klaviyo')
export class KlaviyoController {
  constructor(private readonly klaviyoService: KlaviyoService) {}

  @Get('templates')
  async listTemplates() {
    return this.klaviyoService.listTemplates();
  }
}
