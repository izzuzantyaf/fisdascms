import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from 'src/use-cases/admin/admin.service';
import { AdminController } from './admin.controller';
import { SuccessfulResponse } from 'src/lib/dtos/response.dto';
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
    it('Harus return object bertipe SuccessfulResponse', async () => {
      expect(await controller.getAll()).toBeInstanceOf(SuccessfulResponse);
    });
  });
});
