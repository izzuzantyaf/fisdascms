import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePracticumModuleDto } from 'src/domains/practicum-module/dto/practicum-module.dto';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { PracticumModule } from 'src/domains/practicum-module/entities/practicum-module.entity';
import { PracticumModuleController } from '../practicum-module.controller';
import { PracticumModuleModule } from '../practicum-module.module';

describe('PracticumModuleController', () => {
  let controller: PracticumModuleController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PracticumModuleModule],
    }).compile();

    controller = module.get(PracticumModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll()', () => {
    it(`harus mengembalikan object bertipe ${SuccessfulResponse.name} berisi data array ${PracticumModule.name}`, async () => {
      const response = await controller.getAll();
      const practicumMaterials = response.data as PracticumModule[];
      expect(response).toBeInstanceOf(SuccessfulResponse);
      expect(
        practicumMaterials.every(
          (material) => material instanceof PracticumModule,
        ),
      ).toBeTruthy();
    });
  });

  describe('getPreTasks()', () => {
    it('harus return array yang semua element nya memiliki property preTask', async () => {
      const practicumMaterials = (await controller.getAll())
        .data as PracticumModule[];
      expect(
        practicumMaterials.every((practicumModule) =>
          practicumModule.hasOwnProperty('preTask'),
        ),
      ).toBeTruthy();
    });
  });

  describe('getVideos()', () => {
    it('harus return array yang semua element nya memiliki property video', async () => {
      const practicumMaterials = (await controller.getAll())
        .data as PracticumModule[];
      expect(
        practicumMaterials.every((practicumModule) =>
          practicumModule.hasOwnProperty('video'),
        ),
      ).toBeTruthy();
    });
  });

  describe('getSimulators()', () => {
    it('harus return array yang semua element nya memiliki property simulator', async () => {
      const practicumMaterials = (await controller.getAll())
        .data as PracticumModule[];
      expect(
        practicumMaterials.every((practicumModule) =>
          practicumModule.hasOwnProperty('simulator'),
        ),
      ).toBeTruthy();
    });
  });

  describe('getJournalCovers()', () => {
    it('harus return array yang semua element nya memiliki property journalCover', async () => {
      const practicumMaterials = (await controller.getAll())
        .data as PracticumModule[];
      expect(
        practicumMaterials.every((practicumModule) =>
          practicumModule.hasOwnProperty('journalCover'),
        ),
      ).toBeTruthy();
    });
  });

  describe('update()', () => {
    let practicumModule: PracticumModule;
    beforeAll(async () => {
      practicumModule = (await controller.getAll()).data[0];
    });
    it(`harus berhasil update dan return object bertipe ${SuccessfulResponse.name} berisi data ${PracticumModule.name} yang telah diupdate`, async () => {
      const response = await controller.update(
        practicumModule as UpdatePracticumModuleDto,
      );
      const updatedPracticumModule = response.data as PracticumModule;
      expect(response).toBeInstanceOf(SuccessfulResponse);
      expect(updatedPracticumModule).toBeInstanceOf(PracticumModule);
    });
  });
});
