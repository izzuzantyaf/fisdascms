import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateHandoutDto } from 'src/core/dtos/handout.dto';
import { Handout } from 'src/core/entities/handout.entity';
import { HandoutModule } from '../handout.module';
import { HandoutService } from '../handout.service';

describe('HandoutService', () => {
  let service: HandoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HandoutModule],
    }).compile();

    service = module.get(HandoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('harus return array object instance dari Handout', async () => {
      const handouts = await service.getAll();
      expect(
        handouts.every((handout) => handout instanceof Handout),
      ).toBeTruthy();
    });
  });

  describe('update()', () => {
    let handout: Handout;
    beforeAll(async () => {
      handout = (await service.getAll())[0];
    });
    it('harus berhasil update karena data sudah valid', async () => {
      expect(
        await service.update({
          ...handout,
          url: faker.internet.url(),
          isActive: !handout.isActive,
        } as UpdateHandoutDto),
      ).toBeInstanceOf(Handout);
    });
    it('harus gagal update karena URL tidak valid', async () => {
      await expect(
        service.update({
          ...handout,
          url: 'Link tidak valid',
        } as UpdateHandoutDto),
      ).rejects.toThrow();
    });
  });
});
