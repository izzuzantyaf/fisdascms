import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AssistantLevel, Gender } from 'src/core/constants';
import { Assistant } from 'src/core/entities/assistant.entity';
import { AssistantModule } from '../assistant.module';
import { AssistantService } from '../assistant.service';

const createFakeAssistant = () => ({
  name: faker.name.findName(),
  code: 'AAA',
  gender: Gender.FEMALE,
  level: AssistantLevel.JUNIOR,
  phoneNumber: '082112345678',
  lineId: faker.internet.userName(),
  feedbackUrl: faker.internet.url(),
  profilePictureUrl: faker.internet.url(),
});

describe('AssistantService', () => {
  let service: AssistantService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AssistantModule],
    }).compile();

    service = module.get(AssistantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('harus berhasil ketika semua data memenuhi syarat', async () => {
      const storedAssistant = await service.create(createFakeAssistant());
      expect(storedAssistant).toBeInstanceOf(Assistant);
    });
    it('harus gagal ketika nama kosong', async () => {
      await expect(
        service.create({ ...createFakeAssistant(), name: null }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal ketika jumlah karakter kode tidak sesuai', async () => {
      await expect(
        service.create({
          ...createFakeAssistant(),
          code: 'lebih_dari_3_karakter',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal ketika gender tidak valid', async () => {
      await expect(
        service.create({ ...createFakeAssistant(), gender: 'salah' as Gender }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal ketika level tidak valid', async () => {
      await expect(
        service.create({
          ...createFakeAssistant(),
          level: 'salah' as AssistantLevel,
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus berhasil ketika nomor hp kosong', async () => {
      await expect(
        service.create({ ...createFakeAssistant(), phoneNumber: null }),
      ).resolves.toBeInstanceOf(Assistant);
    });
    it('harus gagal ketika nomor hp tidak valid', async () => {
      await expect(
        service.create({
          ...createFakeAssistant(),
          phoneNumber: '08213738192730192123',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus berhasil ketika ID Line kosong', async () => {
      await expect(
        service.create({ ...createFakeAssistant(), lineId: null }),
      ).resolves.toBeInstanceOf(Assistant);
    });
    it('harus berhasil ketika link feedback kosong', async () => {
      await expect(
        service.create({ ...createFakeAssistant(), feedbackUrl: null }),
      ).resolves.toBeInstanceOf(Assistant);
    });
    it('harus gagal ketika link feedback bukan URL', async () => {
      await expect(
        service.create({
          ...createFakeAssistant(),
          feedbackUrl: 'bukan format URL valid',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus berhasil ketika link foto profil kosong', async () => {
      await expect(
        service.create({ ...createFakeAssistant(), profilePictureUrl: null }),
      ).resolves.toBeInstanceOf(Assistant);
    });
    it('harus gagal ketika link foto profil bukan URL', async () => {
      await expect(
        service.create({
          ...createFakeAssistant(),
          profilePictureUrl: 'bukan format URL valid',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('create()', () => {
    it('harus return array Assistant', async () => {
      expect(
        (await service.getAll()).every(
          (assistant) => assistant instanceof Assistant,
        ),
      ).toBeTruthy();
    });
  });

  describe('update()', () => {
    let storedAssistant;
    beforeAll(async () => {
      storedAssistant = await service.create(createFakeAssistant());
    });
    it('harus berhasil ketika semua data memenuhi syarat', async () => {
      const updatedAssistant = await service.update(storedAssistant);
      expect(updatedAssistant).toBeInstanceOf(Assistant);
    });
    it('harus gagal ketika nama kosong', async () => {
      await expect(
        service.update({ ...storedAssistant, name: null }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal ketika jumlah karakter kode tidak sesuai', async () => {
      await expect(
        service.update({ ...storedAssistant, code: 'lebih_dari_3_karakter' }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal ketika gender tidak valid', async () => {
      await expect(
        service.update({ ...storedAssistant, gender: 'salah' as Gender }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal ketika level tidak valid', async () => {
      await expect(
        service.update({
          ...storedAssistant,
          level: 'salah' as AssistantLevel,
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus berhasil ketika nomor hp kosong', async () => {
      await expect(
        service.update({ ...storedAssistant, phoneNumber: null }),
      ).resolves.toBeInstanceOf(Assistant);
    });
    it('harus gagal ketika nomor hp tidak valid', async () => {
      await expect(
        service.update({
          ...storedAssistant,
          phoneNumber: '08213738192730192123',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus berhasil ketika ID Line kosong', async () => {
      await expect(
        service.update({ ...storedAssistant, lineId: null }),
      ).resolves.toBeInstanceOf(Assistant);
    });
    it('harus berhasil ketika link feedback kosong', async () => {
      await expect(
        service.update({ ...storedAssistant, feedbackUrl: null }),
      ).resolves.toBeInstanceOf(Assistant);
    });
    it('harus gagal ketika link feedback bukan URL', async () => {
      await expect(
        service.update({
          ...storedAssistant,
          feedbackUrl: 'bukan format URL valid',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus berhasil ketika link foto profil kosong', async () => {
      await expect(
        service.update({ ...storedAssistant, profilePictureUrl: null }),
      ).resolves.toBeInstanceOf(Assistant);
    });
    it('harus gagal ketika link foto profil bukan URL', async () => {
      await expect(
        service.update({
          ...storedAssistant,
          profilePictureUrl: 'bukan format URL valid',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete()', () => {
    let assistantId: string;
    beforeAll(async () => {
      const storedAssistant = await service.create(createFakeAssistant());
      assistantId = storedAssistant._id;
    });
    it('harus gagal menghapus asisten karena id tidak valid', async () => {
      await expect(service.delete('salah')).rejects.toThrow();
    });
    it('harus berhasil menghapus asisten', async () => {
      expect(await service.delete(assistantId)).toBeInstanceOf(Assistant);
    });
  });
});
