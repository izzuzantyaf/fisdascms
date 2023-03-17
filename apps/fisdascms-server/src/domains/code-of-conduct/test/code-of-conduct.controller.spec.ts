import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { CodeOfConduct } from 'src/domains/code-of-conduct/entities/code-of-conduct.entity';
import { CodeOfConductController } from '../code-of-conduct.controller';
import { CodeOfConductModule } from '../code-of-conduct.module';

describe('CodeOfConductController', () => {
  let controller: CodeOfConductController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CodeOfConductModule],
    }).compile();

    controller = module.get(CodeOfConductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll()', () => {
    it(`harus return object bertipe ${SuccessfulResponse.name} berisi data ${CodeOfConduct.name}`, async () => {
      const response = await controller.getAll();
      const codeOfConduct = response.data;
      expect(response).toBeInstanceOf(SuccessfulResponse);
      expect(codeOfConduct).toBeInstanceOf(CodeOfConduct);
    });
  });

  describe('update()', () => {
    let codeOfConduct: CodeOfConduct;
    beforeAll(async () => {
      codeOfConduct = (await controller.getAll()).data;
    });
    it(`harus berhasil update dan return object bertipe ${CodeOfConduct.name}`, async () => {
      const response = await controller.update({
        _id: codeOfConduct._id,
        url: faker.internet.url(),
      });
      expect(response).toBeInstanceOf(SuccessfulResponse);
    });
    it('harus gagal karena format link tidak valid', async () => {
      await expect(
        controller.update({
          _id: codeOfConduct._id,
          url: 'not a valid URL',
        }),
      ).rejects.toThrow();
    });
  });
});
