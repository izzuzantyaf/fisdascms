import { faker } from '@faker-js/faker';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AdminRole } from 'src/core/constants';
import { Admin } from 'src/core/entities/admin.entity';
import { AdminModule } from '../admin.module';
import { AdminService } from '../admin.service';

const createFakeAdmin = () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: 'helloworld',
  role: AdminRole.ADMIN,
});

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

  describe('create()', () => {
    const fakeAdmin = createFakeAdmin();
    it('harus berhasil menambahkan admin ke database', async () => {
      const storedAdmin = await service.create(fakeAdmin);
      expect(storedAdmin).toBeInstanceOf(Admin);
    });
    it('harus gagal karena nama kosong', async () => {
      await expect(
        service.create({
          ...fakeAdmin,
          name: null,
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal karena nama melebihi kapasitas karakter', async () => {
      await expect(
        service.create({
          ...fakeAdmin,
          name: 'namenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamename',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal karena email tidak valid', async () => {
      await expect(
        service.create({
          ...fakeAdmin,
          email: 'salah',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal karena password tidak memenuhi minimal panjang karakter', async () => {
      await expect(
        service.create({
          ...fakeAdmin,
          password: 'pass',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal karena role tidak valid', async () => {
      await expect(
        service.create({
          ...fakeAdmin,
          role: 'salah' as AdminRole,
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal karena email sudah terdaftar', async () => {
      await expect(service.create(fakeAdmin)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('getAll()', () => {
    it('harus mengembalikan array Admin', async () => {
      expect(
        (await service.getAll()).every((admin) => admin instanceof Admin),
      ).toBeTruthy();
    });
  });

  describe('delete()', () => {
    let adminId: string;
    beforeAll(async () => {
      const storedFakeAdmin = await service.create(createFakeAdmin());
      adminId = storedFakeAdmin._id;
    });
    it('harus berhasil menghapus admin', async () => {
      expect(await service.delete(adminId)).toBeInstanceOf(Admin);
    });
    it('harus gagal menghapus admin karena id tidak valid', async () => {
      await expect(service.delete('salah')).rejects.toThrow();
    });
  });

  describe('validateAdmin()', () => {
    let adminId: string;
    const fakeAdmin = createFakeAdmin();
    beforeAll(async () => {
      const storedFakeAdmin = await service.create(fakeAdmin);
      adminId = storedFakeAdmin._id;
    });
    it('harus berhasil karena email dan password benar', async () => {
      expect(
        await service.validateAdmin(fakeAdmin.email, fakeAdmin.password),
      ).toBeInstanceOf(Admin);
    });
    it('harus gagal karena email salah', async () => {
      await expect(
        service.validateAdmin('salah', fakeAdmin.password),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal karena password salah', async () => {
      await expect(
        service.validateAdmin(fakeAdmin.email, 'salah'),
      ).rejects.toThrow(BadRequestException);
    });
    afterAll(async () => {
      await service.delete(adminId);
    });
  });
});
