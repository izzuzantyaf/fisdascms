import { Test, TestingModule } from '@nestjs/testing';
import { CodeOfConductController } from './code-of-conduct.controller';
import { CodeOfConductModule } from './code-of-conduct.module';

describe('CodeOfConductController', () => {
  let controller: CodeOfConductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CodeOfConductModule],
    }).compile();

    controller = module.get(CodeOfConductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
