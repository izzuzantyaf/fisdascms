import { BadRequestException, Injectable } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';
import { DataServiceService } from 'src/database/data-service.service';
import { ErrorResponse } from 'src/core/dtos/response.dto';
import { HandoutFactoryService } from './handout-factory.service';
import { HandoutQuery, UpdateHandoutDto } from 'src/core/dtos/handout.dto';

@Injectable()
export class HandoutService {
  constructor(
    private dataService: DataServiceService,
    private handoutFactory: HandoutFactoryService,
  ) {}

  async getAll(query?: HandoutQuery) {
    return this.handoutFactory.createMany(
      await this.dataService.handouts.getAll({
        filter: query,
      }),
    );
  }

  async update(updateHandoutDto: UpdateHandoutDto) {
    console.log('updateHandoutDto :', updateHandoutDto);
    const newHandout = this.handoutFactory.create(updateHandoutDto);
    const validationErrors = newHandout.validateProps();
    if (isNotEmpty(validationErrors))
      throw new BadRequestException(
        new ErrorResponse('Data tidak valid', { validationErrors }),
      );
    const updatedHandout = await this.dataService.handouts.updateById(
      newHandout._id,
      newHandout,
    );
    console.log('Updated handout :', updatedHandout);
    return this.handoutFactory.create(updatedHandout);
  }
}
