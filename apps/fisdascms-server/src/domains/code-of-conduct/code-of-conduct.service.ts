import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { isEmpty, isNotEmpty } from 'class-validator';
import { DataServiceService } from 'src/database/data-service.service';
import { ErrorResponse } from 'src/core/dtos/response.dto';
import { CodeOfConductFactoryService } from './code-of-conduct-factory.service';
import { UpdateCodeOfConductDto } from 'src/domains/code-of-conduct/dto/code-of-conduct.dto';

@Injectable()
export class CodeOfConductService {
  private readonly logger = new Logger(CodeOfConductService.name);
  constructor(
    private dataService: DataServiceService,
    private codeOfConductFactory: CodeOfConductFactoryService,
  ) {}

  async getOne() {
    const codeOfConduct = this.codeOfConductFactory.create(
      await this.dataService.codeOfConducts.getFirst(),
    );
    return codeOfConduct;
  }

  async update(updateCodeOfConductDto: UpdateCodeOfConductDto) {
    this.logger.debug(
      `updateCodeOfConductDto ${JSON.stringify(
        updateCodeOfConductDto,
        undefined,
        2,
      )}`,
    );
    const newCodeOfConduct = this.codeOfConductFactory.create(
      updateCodeOfConductDto,
    );
    const errors = newCodeOfConduct.validateProps();
    if (isNotEmpty(errors)) {
      this.logger.log(
        `Code of conduct data is not valid ${JSON.stringify(errors)}`,
      );
      throw new BadRequestException(
        new ErrorResponse('Tata tertib gagal diupdate', { errors }),
      );
    }
    const updateResult = await this.dataService.codeOfConducts.updateById(
      newCodeOfConduct._id,
      newCodeOfConduct,
    );
    if (isEmpty(updateResult)) {
      this.logger.log(
        `Code of conduct update failed ${JSON.stringify({
          codeOfConductId: newCodeOfConduct._id,
        })}`,
      );
      throw new BadRequestException(
        new ErrorResponse('Tata tertib gagal diupdate'),
      );
    }
    const updatedCodeOfConduct = this.codeOfConductFactory.create(updateResult);
    this.logger.debug(
      `Updated code of conduct ${JSON.stringify(
        updatedCodeOfConduct,
        undefined,
        2,
      )}`,
    );
    this.logger.log(
      `Code of conduct update success ${JSON.stringify({
        codeOfConductId: updatedCodeOfConduct._id,
      })}`,
    );
    return updatedCodeOfConduct;
  }
}
