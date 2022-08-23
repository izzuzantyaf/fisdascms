import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from '../admin.controller';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { AdminModule } from 'src/use-cases/admin/admin.module';
import { Admin } from 'src/core/entities/admin.entity';
import { faker } from '@faker-js/faker';
import { AdminRole } from 'src/core/constants';
import { BadRequestException, ConflictException } from '@nestjs/common';

const createFakeAdmin = () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: 'helloworld',
  role: AdminRole.ADMIN,
});

describe('AdminController', () => {
  let controller: AdminController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AdminModule],
    }).compile();
    controller = module.get(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    const fakeAdmin = createFakeAdmin();
    it(`harus berhasil menambahkan admin ke database dan return object bertipe ${SuccessfulResponse.name}`, async () => {
      const response = await controller.create(fakeAdmin);
      expect(response).toBeInstanceOf(SuccessfulResponse);
      expect(response.data).toBeInstanceOf(Admin);
    });
    it('harus gagal karena nama kosong', async () => {
      await expect(
        controller.create({
          ...fakeAdmin,
          name: null,
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal karena nama melebihi kapasitas karakter', async () => {
      await expect(
        controller.create({
          ...fakeAdmin,
          name: 'namenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamename',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal karena email tidak valid', async () => {
      await expect(
        controller.create({
          ...fakeAdmin,
          email: 'salah',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal karena password tidak memenuhi minimal panjang karakter', async () => {
      await expect(
        controller.create({
          ...fakeAdmin,
          password: 'pass',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal karena role tidak valid', async () => {
      await expect(
        controller.create({
          ...fakeAdmin,
          role: 'salah' as AdminRole,
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal karena email sudah terdaftar', async () => {
      await expect(controller.create(fakeAdmin)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('getAll()', () => {
    it(`harus return object bertipe ${SuccessfulResponse.name} dan data berupa array ${Admin.name}`, async () => {
      const response = await controller.getAll();
      const admins = response.data as Admin[];
      expect(await controller.getAll()).toBeInstanceOf(SuccessfulResponse);
      expect(admins.every((admin) => admin instanceof Admin)).toBeTruthy();
    });
  });

  describe('delete()', () => {
    let adminId: string;
    beforeAll(async () => {
      const storedFakeAdmin = (await controller.create(createFakeAdmin()))
        .data as Admin;
      adminId = storedFakeAdmin._id;
    });
    it(`harus berhasil menghapus admin dan return object bertipe ${SuccessfulResponse.name}`, async () => {
      const response = await controller.delete(adminId);
      expect(response).toBeInstanceOf(SuccessfulResponse);
    });
    it('harus gagal menghapus admin karena id tidak valid', async () => {
      await expect(controller.delete('salah')).rejects.toThrow();
    });
  });
});
