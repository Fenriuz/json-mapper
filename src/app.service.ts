import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SesEventDto } from './dtos/ses-event.dto';
import { MappedResultDto } from './dtos/mapped-result.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  processEvent(event: SesEventDto): MappedResultDto[] {
    return event.Records.map((record) =>
      plainToInstance(MappedResultDto, record, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
