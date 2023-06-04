import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getSimpleGroup() {
    return this.appService.getSimpleGroup();
  }

  @Get('/group')
  getSimpleWithGroupBy() {
    return this.appService.getSimpleWithGroupBy();
  }

  @Get('/multiple')
  getMultipleWithGroupBy() {
    return this.appService.getMultipleWithGroupBy();
  }
}
