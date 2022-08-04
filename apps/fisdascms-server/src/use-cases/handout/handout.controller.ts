import { Body, Controller, Get, Put } from '@nestjs/common';
import { UpdateHandoutDto } from 'src/core/dtos/handout.dto';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { HandoutService } from 'src/use-cases/handout/handout.service';

@Controller('api/handout')
export class HandoutController {
  constructor(private readonly handoutService: HandoutService) {}

  @Get()
  async getAll() {
    const handouts = await this.handoutService.getAll();
    return new SuccessfulResponse('Sukses', { handouts });
  }

  @Put()
  async update(@Body() updateHandoutDto: UpdateHandoutDto) {
    const updatedHandout = await this.handoutService.update(updateHandoutDto);
    return new SuccessfulResponse('Modul berhasil diupdate', {
      updatedHandout,
    });
  }
}
