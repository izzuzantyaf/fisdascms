import { BadRequestException, Injectable } from '@nestjs/common';
import { isEmpty, isMongoId, isNotEmpty } from 'class-validator';
import { DataServiceService } from 'src/database/data-service.service';
import { Assistant } from 'src/domains/assistant/entities/assistant.entity';
import { ErrorResponse } from 'src/core/dtos/response.dto';
import { AssistantFactoryService } from './assistant-factory.service';
import {
  CreateAssistantDto,
  UpdateAssistantDto,
} from 'src/domains/assistant/dto/assistant.dto';
import { Logger } from '@nestjs/common/services';

@Injectable()
export class AssistantService {
  private readonly logger = new Logger(AssistantService.name);

  constructor(
    private dataService: DataServiceService,
    private assistantFactory: AssistantFactoryService,
  ) {}

  async create(createAssistantDto: CreateAssistantDto) {
    this.logger.debug(
      `createAssistantDto ${JSON.stringify(createAssistantDto, undefined, 2)}`,
    );
    const newAssistant = this.assistantFactory.create(createAssistantDto);
    const validationErrors = newAssistant.validateProps();
    if (isNotEmpty(validationErrors)) {
      this.logger.log(
        `Assistant data is not valid ${JSON.stringify(validationErrors)}`,
      );
      throw new BadRequestException(
        new ErrorResponse('Data tidak valid', { errors: validationErrors }),
      );
    }
    const storedAssistant = this.assistantFactory.create(
      await this.dataService.assistants.create(newAssistant),
    );
    this.logger.debug(
      `Stored assistant ${JSON.stringify(storedAssistant, undefined, 2)}`,
    );
    this.logger.log(
      `New assistant created ${JSON.stringify({
        assistantId: storedAssistant._id,
      })}`,
    );
    return storedAssistant;
  }

  async getAll() {
    const assistants = this.assistantFactory.createMany(
      await this.dataService.assistants.getAll(),
    );
    return assistants;
  }

  async search(keyword: string) {
    keyword = keyword.trim();
    const searchResult = this.assistantFactory.createMany(
      await this.dataService.assistants.search(keyword),
    );
    return searchResult;
  }

  async update(updateAssistantDto: UpdateAssistantDto) {
    this.logger.debug(
      `updateAssistantDto ${JSON.stringify(updateAssistantDto, undefined, 2)}`,
    );
    const newAssistant = this.assistantFactory.create(updateAssistantDto);
    const validationErrors = newAssistant.validateProps();
    if (isNotEmpty(validationErrors)) {
      this.logger.log(
        `Assistant data is not valid ${JSON.stringify(validationErrors)}`,
      );
      throw new BadRequestException(
        new ErrorResponse('Data tidak valid', { errors: validationErrors }),
      );
    }
    const updateResult = await this.dataService.assistants.updateById(
      newAssistant._id,
      newAssistant,
    );
    if (isEmpty(updateResult)) {
      this.logger.log(
        `Assistant update failed ${JSON.stringify({
          assistantId: newAssistant._id,
        })}`,
      );
      throw new BadRequestException(
        new ErrorResponse('Asisten gagal diupdate'),
      );
    }
    const updatedAssistant = this.assistantFactory.create(updateResult);
    this.logger.debug(
      `Updated assistant ${JSON.stringify(updateAssistantDto, undefined, 2)}`,
    );
    this.logger.log(
      `Assistant update success ${JSON.stringify({
        assistantId: updatedAssistant._id,
      })}`,
    );
    return updatedAssistant;
  }

  async delete(id: string) {
    const deleteResult = await this.dataService.assistants.deleteById(id);
    if (isEmpty(deleteResult)) {
      this.logger.log(
        `Assistant delete failed ${JSON.stringify({ assistantId: id })}`,
      );
      throw new BadRequestException(new ErrorResponse('Asisten gagal dihapus'));
    }
    const deletedAssistant = this.assistantFactory.create(deleteResult);
    this.logger.debug(
      `Deleted assistant ${JSON.stringify(deletedAssistant, undefined, 2)}`,
    );
    this.logger.log(
      `Assistant delete success ${JSON.stringify({
        assistantId: deletedAssistant._id,
      })}`,
    );
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
