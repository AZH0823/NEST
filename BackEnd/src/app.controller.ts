import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './authGaurd.guard' // 匯入守衛
import { demo } from './demo.decorator'
@UseGuards(new AuthGuard(10))
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('demo')
  triggerDemo(@demo() info: any, @Query() q: any, @demo('level') lv:string):string {
    const { text } = q
    return `You're demo level is ${lv}, classLevel: ${info.levelClass}, ${text}`;
  }
}
