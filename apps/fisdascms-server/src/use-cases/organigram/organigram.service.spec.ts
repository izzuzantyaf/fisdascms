import { Test, TestingModule } from '@nestjs/testing';
import { OrganigramService } from './organigram.service';

describe('OrganigramService', () => {
  let service: OrganigramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganigramService],
    }).compile();

    service = module.get<OrganigramService>(OrganigramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
