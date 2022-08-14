import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { CodeOfConduct } from 'src/core/entities/code-of-conduct.entity';
import { CodeOfConductModule } from '../code-of-conduct.module';
import { CodeOfConductService } from '../code-of-conduct.service';

describe('CodeOfConductService', () => {
  let service: CodeOfConductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CodeOfConductModule],
    }).compile();

    service = module.get(CodeOfConductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOne()', () => {
    it(`harus return object bertipe ${CodeOfConduct.name}`, async () => {
      const code0fConduct = await service.getOne();
      expect(code0fConduct instanceof CodeOfConduct).toBeTruthy();
    });
  });

  describe('update()', () => {
    let codeOfConduct: CodeOfConduct;
    beforeAll(async () => {
      codeOfConduct = await service.getOne();
    });
    it(`harus berhasil update dan return object bertipe ${CodeOfConduct.name}`, async () => {
      const updatedCodeOfConduct = await service.update({
        _id: codeOfConduct._id,
        url: faker.internet.url(),
      });
      expect(updatedCodeOfConduct instanceof CodeOfConduct).toBeTruthy();
    });
    it('harus gagal karena format link tidak valid', async () => {
      await expect(
        service.update({
          _id: codeOfConduct._id,
          url: 'not a valid URL',
        }),
      ).rejects.toThrow();
    });
  });
});
