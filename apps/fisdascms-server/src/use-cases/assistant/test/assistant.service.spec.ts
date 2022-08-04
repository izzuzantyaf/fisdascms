import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Assistant } from 'src/database/entity/assistant.entity';
import { AssistantModule } from '../assistant.module';
import { AssistantService } from '../assistant.service';

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

  let assistantId;
  describe('create()', () => {
    it('harus berhasil menambahkan asisten', async () => {
      const storedAssistant = await service.create({
        name: 'Nama Asisten',
        code: 'AAA',
        phoneNumber: '082123456789',
        lineId: 'random',
        gender: 'male',
        level: 'senior',
        feedbackUrl: 'https://google.com',
        profilePictureUrl: 'https://ikea.com',
      });
      assistantId = storedAssistant._id;
      expect(storedAssistant).toBeInstanceOf(Assistant);
    });
  });

  describe('delete()', () => {
    it('harus berhasil menghapus asisten', async () => {
      expect(await service.delete(assistantId)).toBeInstanceOf(Assistant);
    });
    it('harus gagal menghapus asisten karena id tidak valid', async () => {
      await expect(service.delete('salah')).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
