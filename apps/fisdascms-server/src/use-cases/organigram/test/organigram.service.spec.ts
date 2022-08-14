import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { Organigram } from 'src/core/entities/organigram.entity';
import { OrganigramModule } from '../organigram.module';
import { OrganigramService } from '../organigram.service';

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

  describe('getOne()', () => {
    it('harus mengembalikan object bertipe Organigram', async () => {
      const organigram = await service.getOne();
      expect(organigram instanceof Organigram).toBeTruthy();
    });
  });

  describe('update()', () => {
    let organigram: Organigram;
    beforeAll(async () => {
      organigram = await service.getOne();
    });
    it('harus berhasil update karena semua data sudah valid', async () => {
      expect(
        await service.update({
          _id: organigram._id,
          url: faker.internet.url(),
        }),
      ).toBeInstanceOf(Organigram);
    });
    it('harus gagal update karena URL tidak valid', async () => {
      await expect(
        service.update({
          _id: organigram._id,
          url: 'Link tidak valid',
        }),
      ).rejects.toThrow();
    });
  });
});
