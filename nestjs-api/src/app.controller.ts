import { Controller, Get } from '@nestjs/common';

@Controller()
export class appController {
  @Get()
  login() {
    return 'Hello world';
  }
}
