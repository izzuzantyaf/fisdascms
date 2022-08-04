import { BadRequestException, Injectable } from '@nestjs/common';
import { isEmpty, isMongoId, isNotEmpty } from 'class-validator';
import { DataServiceService } from 'src/database/data-service.service';
import { Assistant } from 'src/core/entities/assistant.entity';
import { ErrorResponse } from 'src/core/dtos/response.dto';
import { AssistantFactoryService } from './assistant-factory.service';
import {
  CreateAssistantDto,
  UpdateAssistantDto,
} from 'src/core/dtos/assistant.dto';

@Injectable()
export class AssistantService {
  constructor(
    private dataService: DataServiceService,
    private assistantFactory: AssistantFactoryService,
  ) {}

  async create(createAssistantDto: CreateAssistantDto) {
    console.log('Incoming data :', createAssistantDto);
    const newAssistant = this.assistantFactory.create(createAssistantDto);
    const validationErrors = newAssistant.validateProps();
    if (isNotEmpty(validationErrors))
      throw new BadRequestException(
        new ErrorResponse('Data tidak valid', { errors: validationErrors }),
      );
    const storedAssistant = this.assistantFactory.create(
      await this.dataService.assistants.create(newAssistant),
    );
    console.log('Stored assistant :', storedAssistant);
    return storedAssistant;
  }

  async getAll() {
    const assistants = this.assistantFactory.createMany(
      await this.dataService.assistants.getAll(),
    );
    return assistants;
  }

  async search(keyword: string) {
    console.log('Incoming data :', keyword);
    keyword = keyword.trim();
    const searchResult = this.assistantFactory.createMany(
      await this.dataService.assistants.search(keyword),
    );
    return searchResult;
  }

  async update(updateAssistantDto: UpdateAssistantDto) {
    console.log('Incoming data :', updateAssistantDto);
    const newAssistant = this.assistantFactory.create(updateAssistantDto);
    const validationErrors = newAssistant.validateProps();
    if (isNotEmpty(validationErrors))
      throw new BadRequestException(
        new ErrorResponse('Data tidak valid', { errors: validationErrors }),
      );
    const updateResult = await this.dataService.assistants.updateById(
      newAssistant._id,
      newAssistant,
    );
    if (isEmpty(updateResult))
      throw new BadRequestException(
        new ErrorResponse('Asisten gagal diupdate'),
      );
    const updatedAssistant = this.assistantFactory.create(updateResult);
    console.log('Updated assistant :', updatedAssistant);
    return updatedAssistant;
  }

  async delete(id: string) {
    console.log('Incoming data :', id);
    if (!isMongoId(id))
      throw new BadRequestException(new ErrorResponse('Asisten gagal dihapus'));
    const deleteResult = await this.dataService.assistants.deleteById(id);
    if (isEmpty(deleteResult))
      throw new BadRequestException(new ErrorResponse('Asisten gagal dihapus'));
    const deletedAssistant = this.assistantFactory.create(deleteResult);
    console.log('Deleted assistant :', deletedAssistant);
    return deletedAssistant;
  }

  async deleteMany(ids: string[]) {
    console.log('Incoming data :', ids);
    const deletedAdmins: Assistant[] = [];
    for (const id of ids) {
      if (!isMongoId(id)) continue;
      const deletedAdmin = await this.delete(id);
      deletedAdmins.push(deletedAdmin);
    }
    return deletedAdmins;
  }
}
