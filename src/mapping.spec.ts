import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { SesEventDto } from './dtos/ses-event.dto';

const sampleEvent = {
  Records: [
    {
      eventVersion: '1.0',
      ses: {
        receipt: {
          timestamp: '2015-09-11T20:32:33.936Z',
          processingTimeMillis: 222,
          recipients: ['recipient@example.com'],
          spamVerdict: { status: 'PASS' },
          virusVerdict: { status: 'PASS' },
          spfVerdict: { status: 'PASS' },
          dkimVerdict: { status: 'PASS' },
          dmarcVerdict: { status: 'PASS' },
          dmarcPolicy: 'reject',
          action: {
            type: 'SNS',
            topicArn: 'arn:aws:sns:us-east-1:012345678912:example-topic',
          },
        },
        mail: {
          timestamp: '2015-09-11T20:32:33.936Z',
          source: '61967230-7A45-4A9D-BEC9-87CBCF2211C9@example.com',
          messageId: 'd6iitobk75ur44p8kdnnp7g2n800',
          destination: ['recipient@example.com'],
          headersTruncated: false,
          headers: [],
          commonHeaders: {},
        },
      },
      eventSource: 'aws:ses',
    },
  ],
};

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should map SES event correctly', () => {
    // Cast to unknown then to SesEventDto to bypass strict type checks for the mock data
    // or just pass it as any if the test allows.
    const result = service.processEvent(sampleEvent as unknown as SesEventDto);

    console.log(JSON.stringify(result, null, 2));

    expect(result).toHaveLength(1);
    expect(result[0].spam).toBe(true);
    expect(result[0].virus).toBe(true);
    expect(result[0].dns).toBe(true);
    expect(result[0].mes).toBe('septiembre');
    expect(result[0].retrasado).toBe(false); // 222 < 1000
    expect(result[0].emisor).toBe('61967230-7A45-4A9D-BEC9-87CBCF2211C9');
    expect(result[0].receptor).toEqual(['recipient']);
  });
});
