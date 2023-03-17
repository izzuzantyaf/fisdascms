import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateHandoutDto } from 'src/domains/handout/dto/handout.dto';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { Handout } from 'src/domains/handout/entities/handout.entity';
import { HandoutController } from '../handout.controller';
import { HandoutModule } from '../handout.module';

describe('HandoutController', () => {
  let controller: HandoutController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HandoutModule],
    }).compile();

    controller = module.get(HandoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll()', () => {
    it(`harus return array object bertipe ${SuccessfulResponse.name} berisi data array ${Handout.name}`, async () => {
      const response = await controller.getAll();
      const handouts = response.data as Handout[];
      expect(response).toBeInstanceOf(SuccessfulResponse);
      expect(
        handouts.every((handout) => handout instanceof Handout),
      ).toBeTruthy();
    });

    it(`harus return data array ${Handout.name} yang property isActive = true`, async () => {
      const activeHandouts = (await controller.getAll({ isActive: true }))
        .data as Handout[];
      expect(
        activeHandouts.every((handout) => handout.isActive == true),
      ).toBeTruthy();
    });
  });

  describe('update()', () => {
    let handout: Handout;
    beforeAll(async () => {
      handout = (await controller.getAll()).data[0];
    });
    it(`harus berhasil update dan return object bertipe ${SuccessfulResponse.name} berisi data ${Handout.name} yang telah diupdate`, async () => {
      const response = await controller.update({
        ...handout,
        url: faker.internet.url(),
        isActive: !handout.isActive,
      } as UpdateHandoutDto);
      const updatedHandout = response.data as Handout;
      expect(response).toBeInstanceOf(SuccessfulResponse);
      expect(updatedHandout).toBeInstanceOf(Handout);
    });
    it('harus gagal update karena URL tidak valid', async () => {
      await expect(
        controller.update({
          ...handout,
          url: 'Link tidak valid',
        } as UpdateHandoutDto),
      ).rejects.toThrow();
    });
  });
});
