import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SesEventDto } from './dtos/ses-event.dto';
import { MappedResultDto } from './dtos/mapped-result.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  mapEvent(@Body() event: SesEventDto): MappedResultDto[] {
    return this.appService.processEvent(event);
  }
}
