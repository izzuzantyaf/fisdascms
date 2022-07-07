import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Admin } from 'src/database/entity/admin.entity';
import { adminSeeder } from 'src/database/seeds/admin.seed';
import { AdminModule } from './admin.module';
import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AdminModule],
    }).compile();

    service = module.get(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('harus mengembalikan array Admin', async () => {
      expect(await service.getAll()).toBeTruthy();
    });
  });

  describe('validateAdmin()', () => {
    it('skenario email dan password benar', async () => {
      expect(
        await service.validateAdmin(adminSeeder.email, adminSeeder.password),
      ).toBeInstanceOf(Admin);
    });
    it('skenario email salah', async () => {
      await expect(
        service.validateAdmin('salah', adminSeeder.password),
      ).rejects.toThrow(BadRequestException);
    });
    it('skenario password salah', async () => {
      await expect(
        service.validateAdmin(adminSeeder.email, 'salah'),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
