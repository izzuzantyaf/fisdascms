import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { Schedule } from 'src/core/entities/schedule.entity';
import { ScheduleModule } from '../schedule.module';
import { ScheduleService } from '../schedule.service';

describe('ScheduleService', () => {
  let service: ScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ScheduleModule],
    }).compile();

    service = module.get(ScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('harus return array yang semua elemen nya bertipe Schedule', async () => {
      expect(
        (await service.getAll()).every(
          (schedule) => schedule instanceof Schedule,
        ),
      ).toBeTruthy();
    });
  });

  describe('update()', () => {
    let schedule: Schedule;
    beforeAll(async () => {
      schedule = (await service.getAll())[0];
    });

    it('harus berhasil update karena semua data sudah valid', async () => {
      schedule.url = faker.internet.url();
      schedule.isActive = !schedule.isActive;
      expect(
        await service.update({
          _id: schedule._id,
          url: schedule.url,
          isActive: schedule.isActive,
        }),
      ).toBeInstanceOf(Schedule);
    });
    it('harus gagal karena link tidak valid', async () => {
      schedule.url = 'Link ngasal';
      await expect(
        service.update({
          _id: schedule._id,
          url: schedule.url,
          isActive: schedule.isActive,
        }),
      ).rejects.toThrow();
    });
  });
});
