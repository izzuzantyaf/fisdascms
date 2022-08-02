import { BadRequestException, ConflictException } from '@nestjs/common';
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

  let adminId;
  describe('create()', () => {
    it('harus berhasil menambahkan admin ke database', async () => {
      const storedAdmin = await service.create({
        name: 'Admin',
        email: 'admin@gmail.com',
        password: 'helloworld',
        role: 'admin',
      });
      adminId = storedAdmin._id;
      expect(storedAdmin).toBeInstanceOf(Admin);
    });
    it('harus gagal karena nama kosong', async () => {
      await expect(
        service.create({
          name: '',
          email: 'admin@gmail.com',
          password: 'helloworld',
          role: 'admin',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal karena nama melebihi kapasitas karakter', async () => {
      await expect(
        service.create({
          name: 'namenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamename',
          email: 'admin@gmail.com',
          password: 'helloworld',
          role: 'admin',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal karena email tidak valid', async () => {
      await expect(
        service.create({
          name: 'Admin',
          email: 'salah',
          password: 'helloworld',
          role: 'admin',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal karena password tidak memenuhi syarat', async () => {
      await expect(
        service.create({
          name: 'Admin',
          email: 'admin@gmail.com',
          password: 'pass',
          role: 'admin',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal karena role tidak valid', async () => {
      await expect(
        service.create({
          name: 'Admin',
          email: 'admin@gmail.com',
          password: 'helloworld',
          role: 'salah',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal karena email sudah terdaftar', async () => {
      await expect(
        service.create({
          name: 'Admin',
          email: 'admin@gmail.com',
          password: 'helloworld',
          role: 'admin',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('getAll()', () => {
    it('harus mengembalikan array Admin', async () => {
      expect(await service.getAll()).toBeTruthy();
    });
  });

  describe('delete()', () => {
    it('harus berhasil menghapus admin', async () => {
      expect(await service.delete(adminId)).toBeInstanceOf(Admin);
    });
  });

  describe('validateAdmin()', () => {
    it('harus berhasil karena email dan password benar', async () => {
      expect(
        await service.validateAdmin(adminSeeder.email, adminSeeder.password),
      ).toBeInstanceOf(Admin);
    });
    it('harus gagal karena email salah', async () => {
      await expect(
        service.validateAdmin('salah', adminSeeder.password),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal karena password salah', async () => {
      await expect(
        service.validateAdmin(adminSeeder.email, 'salah'),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
