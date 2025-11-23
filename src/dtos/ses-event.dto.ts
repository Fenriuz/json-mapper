import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class VerdictDto {
  @IsString()
  status: string;
}

export class SesReceiptDto {
  @IsString()
  timestamp: string;

  @IsNumber()
  processingTimeMillis: number;

  @ValidateNested()
  @Type(() => VerdictDto)
  spamVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  virusVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  spfVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  dkimVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  dmarcVerdict: VerdictDto;
}

export class SesMailDto {
  @IsString()
  timestamp: string;

  @IsString()
  source: string;

  @IsArray()
  @IsString({ each: true })
  destination: string[];

  @IsString()
  messageId: string;
}

export class SesEntityDto {
  @ValidateNested()
  @Type(() => SesReceiptDto)
  receipt: SesReceiptDto;

  @ValidateNested()
  @Type(() => SesMailDto)
  mail: SesMailDto;
}

export class SesRecordDto {
  @ValidateNested()
  @Type(() => SesEntityDto)
  ses: SesEntityDto;

  @IsString()
  eventSource: string;
}

export class SesEventDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SesRecordDto)
  Records: SesRecordDto[];
}
