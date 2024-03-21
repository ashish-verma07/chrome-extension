import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

interface Response {
  data: any;
  status: number;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<Response> {
    return this.appService.getHello();
  }
}
