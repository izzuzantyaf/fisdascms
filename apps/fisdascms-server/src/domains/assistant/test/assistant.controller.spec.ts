import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AssistantLevel, Gender } from 'src/core/constants';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { Assistant } from 'src/domains/assistant/entities/assistant.entity';
import { AssistantController } from '../assistant.controller';
import { AssistantModule } from '../assistant.module';

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

describe('AssistantController', () => {
  let controller: AssistantController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AssistantModule],
    }).compile();

    controller = module.get(AssistantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it(`harus berhasil menambahkan asisten dan return object bertipe ${SuccessfulResponse.name} berisi data asisten yang ditambahkan`, async () => {
      const response = await controller.create(createFakeAssistant());
      expect(response).toBeInstanceOf(SuccessfulResponse);
      expect(response.data).toBeInstanceOf(Assistant);
    });
    it('harus gagal ketika nama kosong', async () => {
      await expect(
        controller.create({ ...createFakeAssistant(), name: null }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal ketika jumlah karakter kode tidak sesuai', async () => {
      await expect(
        controller.create({
          ...createFakeAssistant(),
          code: 'lebih_dari_3_karakter',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal ketika gender tidak valid', async () => {
      await expect(
        controller.create({
          ...createFakeAssistant(),
          gender: 'salah' as Gender,
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal ketika level tidak valid', async () => {
      await expect(
        controller.create({
          ...createFakeAssistant(),
          level: 'salah' as AssistantLevel,
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus berhasil ketika nomor hp kosong', async () => {
      await expect(
        controller.create({ ...createFakeAssistant(), phoneNumber: null }),
      ).resolves.toBeInstanceOf(SuccessfulResponse);
    });
    it('harus gagal ketika nomor hp tidak valid', async () => {
      await expect(
        controller.create({
          ...createFakeAssistant(),
          phoneNumber: '08213738192730192123',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus berhasil ketika ID Line kosong', async () => {
      await expect(
        controller.create({ ...createFakeAssistant(), lineId: null }),
      ).resolves.toBeInstanceOf(SuccessfulResponse);
    });
    it('harus berhasil ketika link feedback kosong', async () => {
      await expect(
        controller.create({ ...createFakeAssistant(), feedbackUrl: null }),
      ).resolves.toBeInstanceOf(SuccessfulResponse);
    });
    it('harus gagal ketika link feedback bukan URL', async () => {
      await expect(
        controller.create({
          ...createFakeAssistant(),
          feedbackUrl: 'bukan format URL valid',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus berhasil ketika link foto profil kosong', async () => {
      await expect(
        controller.create({
          ...createFakeAssistant(),
          profilePictureUrl: null,
        }),
      ).resolves.toBeInstanceOf(SuccessfulResponse);
    });
    it('harus gagal ketika link foto profil bukan URL', async () => {
      await expect(
        controller.create({
          ...createFakeAssistant(),
          profilePictureUrl: 'bukan format URL valid',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getAll()', () => {
    it(`harus return object bertipe ${SuccessfulResponse.name} dan data berupa array ${Assistant.name}`, async () => {
      const response = await controller.getAll();
      const assistants = response.data as Assistant[];
      expect(response).toBeInstanceOf(SuccessfulResponse);
      expect(
        assistants.every((assistant) => assistant instanceof Assistant),
      ).toBeTruthy();
    });
  });

  describe('update()', () => {
    let storedAssistant;
    beforeAll(async () => {
      storedAssistant = (await controller.create(createFakeAssistant()))
        .data as Assistant;
    });
    it(`harus berhasil update dan return object ${SuccessfulResponse.name} berisi asisten yang telah diupdate`, async () => {
      const response = await controller.update(storedAssistant);
      const updatedAssistant = response.data as Assistant;
      expect(response).toBeInstanceOf(SuccessfulResponse);
      expect(updatedAssistant).toBeInstanceOf(Assistant);
    });
    it('harus gagal ketika nama kosong', async () => {
      await expect(
        controller.update({ ...storedAssistant, name: null }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal ketika jumlah karakter kode tidak sesuai', async () => {
      await expect(
        controller.update({
          ...storedAssistant,
          code: 'lebih_dari_3_karakter',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal ketika gender tidak valid', async () => {
      await expect(
        controller.update({ ...storedAssistant, gender: 'salah' as Gender }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal ketika level tidak valid', async () => {
      await expect(
        controller.update({
          ...storedAssistant,
          level: 'salah' as AssistantLevel,
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus berhasil ketika nomor hp kosong', async () => {
      expect(
        await controller.update({ ...storedAssistant, phoneNumber: null }),
      ).toBeInstanceOf(SuccessfulResponse);
    });
    it('harus gagal ketika nomor hp tidak valid', async () => {
      await expect(
        controller.update({
          ...storedAssistant,
          phoneNumber: '08213738192730192123',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus berhasil ketika ID Line kosong', async () => {
      expect(
        await controller.update({ ...storedAssistant, lineId: null }),
      ).toBeInstanceOf(SuccessfulResponse);
    });
    it('harus berhasil ketika link feedback kosong', async () => {
      expect(
        await controller.update({ ...storedAssistant, feedbackUrl: null }),
      ).toBeInstanceOf(SuccessfulResponse);
    });
    it('harus gagal ketika link feedback bukan URL', async () => {
      await expect(
        controller.update({
          ...storedAssistant,
          feedbackUrl: 'bukan format URL valid',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus berhasil ketika link foto profil kosong', async () => {
      expect(
        await controller.update({
          ...storedAssistant,
          profilePictureUrl: null,
        }),
      ).toBeInstanceOf(SuccessfulResponse);
    });
    it('harus gagal ketika link foto profil bukan URL', async () => {
      await expect(
        controller.update({
          ...storedAssistant,
          profilePictureUrl: 'bukan format URL valid',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete()', () => {
    let assistantId: string;
    beforeAll(async () => {
      const storedAssistant = (await controller.create(createFakeAssistant()))
        .data as Assistant;
      assistantId = storedAssistant._id;
    });
    it('harus gagal menghapus asisten karena id tidak valid', async () => {
      await expect(controller.delete('salah')).rejects.toThrow();
    });
    it(`harus berhasil menghapus asisten dan return object bertipe ${SuccessfulResponse.name}`, async () => {
      expect(await controller.delete(assistantId)).toBeInstanceOf(
        SuccessfulResponse,
      );
    });
  });
});
