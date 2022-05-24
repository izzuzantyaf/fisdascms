import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from 'src/use-cases/admin/admin.service';
import { AdminController } from './admin.controller';
import { SuccessfulResponse } from 'src/entities/dtos/response.dto';
import { AdminModule } from 'src/use-cases/admin/admin.module';

describe('AdminController', () => {
  let controller: AdminController;
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AdminModule],
    }).compile();
    controller = module.get(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get all', () => {
    it('harus menghasilkan array admin', async () => {
      expect(await controller.getAll()).toBeInstanceOf(SuccessfulResponse);
    });
  });
});
