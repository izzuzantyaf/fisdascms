import { Test, TestingModule } from '@nestjs/testing';
import { OrganigramModule } from './organigram.module';
import { OrganigramService } from './organigram.service';

describe('OrganigramService', () => {
  let service: OrganigramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OrganigramModule],
    }).compile();

    service = module.get(OrganigramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
