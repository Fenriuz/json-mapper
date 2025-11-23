import { Expose, Transform } from 'class-transformer';
import { SesRecordDto } from './ses-event.dto';

export class MappedResultDto {
  @Expose()
  @Transform(({ obj }: { obj: SesRecordDto }) => {
    return obj.ses.receipt.spamVerdict.status === 'PASS';
  })
  spam: boolean;

  @Expose()
  @Transform(({ obj }: { obj: SesRecordDto }) => {
    return obj.ses.receipt.virusVerdict.status === 'PASS';
  })
  virus: boolean;

  @Expose()
  @Transform(({ obj }: { obj: SesRecordDto }) => {
    const receipt = obj.ses.receipt;
    return (
      receipt.spfVerdict.status === 'PASS' &&
      receipt.dkimVerdict.status === 'PASS' &&
      receipt.dmarcVerdict.status === 'PASS'
    );
  })
  dns: boolean;

  @Expose()
  @Transform(({ obj }: { obj: SesRecordDto }) => {
    const date = new Date(obj.ses.mail.timestamp);
    // Returns full month name (e.g., "September")
    return date.toLocaleString('es-ES', { month: 'long' });
  })
  mes: string;

  @Expose()
  @Transform(({ obj }: { obj: SesRecordDto }) => {
    return obj.ses.receipt.processingTimeMillis > 1000;
  })
  retrasado: boolean;

  @Expose()
  @Transform(({ obj }: { obj: SesRecordDto }) => {
    const source = obj.ses.mail.source;
    return source.split('@')[0];
  })
  emisor: string;

  @Expose()
  @Transform(({ obj }: { obj: SesRecordDto }) => {
    return obj.ses.mail.destination.map((email) => email.split('@')[0]);
  })
  receptor: string[];
}
