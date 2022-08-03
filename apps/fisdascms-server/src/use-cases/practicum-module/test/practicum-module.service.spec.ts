import { Test, TestingModule } from '@nestjs/testing';
import { PracticumModuleModule } from '../practicum-module.module';
import { PracticumModuleService } from '../practicum-module.service';

describe('PracticumModuleService', () => {
  let service: PracticumModuleService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PracticumModuleModule],
    }).compile();

    service = module.get(PracticumModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('harus return array practicum material', async () => {
      expect(await service.getAll()).toBeTruthy();
    });
  });

  describe('getPreTasks()', () => {
    it('harus return array practicum material', async () => {
      expect(
        (await service.getPreTasks()).every((practicumModule) =>
          practicumModule.hasOwnProperty('preTask'),
        ),
      ).toBeTruthy();
    });
  });

  describe('getVideos()', () => {
    it('harus return array practicum material', async () => {
      expect(
        (await service.getVideos()).every((practicumModule) =>
          practicumModule.hasOwnProperty('video'),
        ),
      ).toBeTruthy();
    });
  });

  describe('getSimulators()', () => {
    it('harus return array practicum material', async () => {
      expect(
        (await service.getSimulators()).every((practicumModule) =>
          practicumModule.hasOwnProperty('simulator'),
        ),
      ).toBeTruthy();
    });
  });

  describe('getJournalCovers()', () => {
    it('harus return array practicum material', async () => {
      expect(
        (await service.getJournalCovers()).every((practicumModule) =>
          practicumModule.hasOwnProperty('journalCover'),
        ),
      ).toBeTruthy();
    });
  });

  // describe('update()', () => {
  //   it('');
  // });
});
