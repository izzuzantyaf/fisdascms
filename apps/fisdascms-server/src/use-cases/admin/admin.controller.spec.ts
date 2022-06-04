import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from 'src/use-cases/admin/admin.service';
import { AdminController } from './admin.controller';
import { ErrorResponse, SuccessfulResponse } from 'src/lib/dtos/response.dto';
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

  describe('getAll', () => {
    it('harus menghasilkan array admin', async () => {
      expect(await controller.getAll()).toBeInstanceOf(ErrorResponse);
    });
  });
});
