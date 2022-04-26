import { Test, TestingModule } from '@nestjs/testing';
import { CodeOfConductController } from './code-of-conduct.controller';

describe('CodeOfConductController', () => {
  let controller: CodeOfConductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodeOfConductController],
    }).compile();

    controller = module.get<CodeOfConductController>(CodeOfConductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
