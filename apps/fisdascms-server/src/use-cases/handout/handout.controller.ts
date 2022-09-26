import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HandoutQuery, UpdateHandoutDto } from 'src/core/dtos/handout.dto';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { HandoutService } from 'src/use-cases/handout/handout.service';

@ApiTags('handout')
@Controller('api/handout')
export class HandoutController {
  constructor(private readonly handoutService: HandoutService) {}

  @Get()
  async getAll(@Query() query?: HandoutQuery) {
    console.log('Handout query :', query);
    const handouts = await this.handoutService.getAll(query);
    return new SuccessfulResponse('Sukses', handouts);
  }

  @Put()
  async update(@Body() updateHandoutDto: UpdateHandoutDto) {
    const updatedHandout = await this.handoutService.update(updateHandoutDto);
    return new SuccessfulResponse('Modul berhasil diupdate', updatedHandout);
  }
}
