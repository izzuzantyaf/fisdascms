import { Test, TestingModule } from '@nestjs/testing';
import { OrganigramController } from '../organigram.controller';
import { OrganigramModule } from '../organigram.module';

describe('OrganigramController', () => {
  let controller: OrganigramController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OrganigramModule],
    }).compile();

    controller = module.get(OrganigramController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
