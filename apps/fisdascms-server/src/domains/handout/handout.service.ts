import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { isEmpty, isNotEmpty } from 'class-validator';
import { DataServiceService } from 'src/database/data-service.service';
import { ErrorResponse } from 'src/core/dtos/response.dto';
import { HandoutFactoryService } from './handout-factory.service';
import {
  HandoutQuery,
  UpdateHandoutDto,
} from 'src/domains/handout/dto/handout.dto';

@Injectable()
export class HandoutService {
  private readonly logger = new Logger(HandoutService.name);

  constructor(
    private dataService: DataServiceService,
    private handoutFactory: HandoutFactoryService,
  ) {}

  async getAll(filter?: HandoutQuery) {
    this.logger.debug(`Handout filter ${JSON.stringify(filter, undefined, 2)}`);
    return this.handoutFactory.createMany(
      await this.dataService.handouts.getAll({
        filter,
      }),
    );
  }

  async update(updateHandoutDto: UpdateHandoutDto) {
    this.logger.debug(
      `updateHandoutDto ${JSON.stringify(updateHandoutDto, undefined, 2)}`,
    );
    const newHandout = this.handoutFactory.create(updateHandoutDto);
    const validationErrors = newHandout.validateProps();
    if (isNotEmpty(validationErrors)) {
      this.logger.log(
        `Handout data is not valid ${JSON.stringify(validationErrors)}`,
      );
      throw new BadRequestException(
        new ErrorResponse('Data tidak valid', { validationErrors }),
      );
    }
    const updatedHandout = await this.dataService.handouts.updateById(
      newHandout._id,
      newHandout,
    );
    if (isEmpty(updatedHandout)) {
      this.logger.log(
        `Handout update failed ${JSON.stringify({
          handoutId: updateHandoutDto._id,
        })}`,
      );
      throw new BadRequestException(
        new ErrorResponse('Handout gagal diupdate'),
      );
    }
    this.logger.debug(
      `Updated handout ${JSON.stringify(updatedHandout, undefined, 2)}`,
    );
    this.logger.log(
      `Handout update success ${JSON.stringify({
        handoutId: updatedHandout._id,
      })}`,
    );
    return this.handoutFactory.create(updatedHandout);
  }
}
