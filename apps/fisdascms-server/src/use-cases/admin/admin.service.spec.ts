import { Test, TestingModule } from '@nestjs/testing';
import { AdminModule } from './admin.module';
import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AdminModule],
    }).compile();

    service = await module.resolve(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('semua', async () => {
    expect(await service.getAll()).toBeTruthy();
  });
});
