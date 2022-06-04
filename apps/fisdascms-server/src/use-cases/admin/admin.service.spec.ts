import { Test, TestingModule } from '@nestjs/testing';
import { Admin } from 'src/database/entity/admin.entity';
import { adminSeeder } from 'src/database/seeds/admin.seed';
import { AdminModule } from './admin.module';
import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AdminModule],
    }).compile();

    service = module.get(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('harus mengembalikan Admin[]', async () => {
      expect(await service.getAll()).toBeTruthy();
    });
  });

  describe('validateAdmin()', () => {
    it('skenario email dan password benar', async () => {
      expect(
        await service.validateAdmin(adminSeeder.email, adminSeeder.password),
      ).toBeInstanceOf(Admin);
    });
  });
});
