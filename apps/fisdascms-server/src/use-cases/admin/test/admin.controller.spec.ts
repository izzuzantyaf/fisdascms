import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from 'src/use-cases/admin/admin.service';
import { AdminController } from '../admin.controller';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { AdminModule } from 'src/use-cases/admin/admin.module';

describe('AdminController', () => {
  let controller: AdminController;
  let service: AdminService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AdminModule],
    }).compile();
    controller = module.get(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll()', () => {
    it(`harus return object bertipe ${SuccessfulResponse.name}`, async () => {
      expect(await controller.getAll()).toBeInstanceOf(SuccessfulResponse);
    });
  });
});
