import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePracticumModuleDto } from 'src/core/dtos/practicum-module.dto';
import { PracticumModule } from 'src/core/entities/practicum-module.entity';
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
      expect(
        (await service.getAll()).every(
          (material) => material instanceof PracticumModule,
        ),
      ).toBeTruthy();
    });
  });

  describe('getPreTasks()', () => {
    it('harus return array yang semua element nya memiliki property preTask', async () => {
      expect(
        (await service.getPreTasks()).every((practicumModule) =>
          practicumModule.hasOwnProperty('preTask'),
        ),
      ).toBeTruthy();
    });
  });

  describe('getVideos()', () => {
    it('harus return array yang semua element nya memiliki property video', async () => {
      expect(
        (await service.getVideos()).every((practicumModule) =>
          practicumModule.hasOwnProperty('video'),
        ),
      ).toBeTruthy();
    });
  });

  describe('getSimulators()', () => {
    it('harus return array yang semua element nya memiliki property simulator', async () => {
      expect(
        (await service.getSimulators()).every((practicumModule) =>
          practicumModule.hasOwnProperty('simulator'),
        ),
      ).toBeTruthy();
    });
  });

  describe('getJournalCovers()', () => {
    it('harus return array yang semua element nya memiliki property journalCover', async () => {
      expect(
        (await service.getJournalCovers()).every((practicumModule) =>
          practicumModule.hasOwnProperty('journalCover'),
        ),
      ).toBeTruthy();
    });
  });

  describe('update()', () => {
    let practicumModule: PracticumModule;
    beforeAll(async () => {
      practicumModule = (await service.getAll())[0];
    });
    it('harus berhasil update karena semua data sudah valid', async () => {
      expect(
        await service.update(practicumModule as UpdatePracticumModuleDto),
      ).toBeInstanceOf(PracticumModule);
    });
  });
});
