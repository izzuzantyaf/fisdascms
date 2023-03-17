import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { Schedule } from 'src/domains/schedule/entities/schedule.entity';
import { ScheduleController } from '../schedule.controller';
import { ScheduleModule } from '../schedule.module';

describe('ScheduleController', () => {
  let module: TestingModule;
  let controller: ScheduleController;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ScheduleModule],
    }).compile();

    controller = module.get(ScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll()', () => {
    it(`harus mengembalikan object bertipe ${SuccessfulResponse.name} dan data berupa array ${Schedule.name}`, async () => {
      const response = await controller.getAll();
      const schedules = response.data as Schedule[];
      expect(response).toBeInstanceOf(SuccessfulResponse);
      expect(
        schedules.every((schedule) => schedule instanceof Schedule),
      ).toBeTruthy();
    });

    it(`harus return data array ${Schedule.name} yang property isActive = true`, async () => {
      const schedules = (await controller.getAll({ isActive: true }))
        .data as Schedule[];
      expect(
        schedules.every((schedule) => schedule.isActive == true),
      ).toBeTruthy();
    });
  });

  describe('update()', () => {
    let schedule: Schedule;
    beforeAll(async () => {
      schedule = (await controller.getAll()).data[0];
    });

    it(`harus berhasil update dan return object bertipe ${SuccessfulResponse.name} berisi data jadwal yang telah diupdate`, async () => {
      schedule.url = faker.internet.url();
      schedule.isActive = !schedule.isActive;
      const response = await controller.update({
        _id: schedule._id,
        url: schedule.url,
        isActive: schedule.isActive,
      });
      const updatedSchedule = response.data;
      expect(response).toBeInstanceOf(SuccessfulResponse);
      expect(updatedSchedule).toBeInstanceOf(Schedule);
    });
    it('harus gagal karena link tidak valid', async () => {
      schedule.url = 'Link ngasal';
      await expect(
        controller.update({
          _id: schedule._id,
          url: schedule.url,
          isActive: schedule.isActive,
        }),
      ).rejects.toThrow();
    });
  });
});
