import { Body, Controller, Get, Logger, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HandoutQuery,
  UpdateHandoutDto,
} from 'src/domains/handout/dto/handout.dto';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { HandoutService } from 'src/domains/handout/handout.service';

@ApiTags('handout')
@Controller('api/handout')
export class HandoutController {
  private readonly logger = new Logger(HandoutController.name);

  constructor(private readonly handoutService: HandoutService) {}

  @Get()
  async getAll(@Query() filter?: HandoutQuery) {
    const handouts = await this.handoutService.getAll(filter);
    return new SuccessfulResponse('Sukses', handouts);
  }

  @Put()
  async update(@Body() updateHandoutDto: UpdateHandoutDto) {
    const updatedHandout = await this.handoutService.update(updateHandoutDto);
    return new SuccessfulResponse('Modul berhasil diupdate', updatedHandout);
  }
}
