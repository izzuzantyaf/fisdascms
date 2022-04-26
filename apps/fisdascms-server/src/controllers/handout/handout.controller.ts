import { Body, Controller, Get, Put } from '@nestjs/common';
import { SuccessfulResponse } from 'src/entities/dtos/response.dto';
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
  async update(@Body() updateData: object) {
    const updatedHandout = await this.handoutService.update(updateData);
    return new SuccessfulResponse('Modul berhasil diupdate', {
      updatedHandout,
    });
  }
}
