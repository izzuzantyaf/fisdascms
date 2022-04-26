import { Test, TestingModule } from '@nestjs/testing';
import { OrganigramController } from './organigram.controller';

describe('OrganigramController', () => {
  let controller: OrganigramController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganigramController],
    }).compile();

    controller = module.get<OrganigramController>(OrganigramController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
