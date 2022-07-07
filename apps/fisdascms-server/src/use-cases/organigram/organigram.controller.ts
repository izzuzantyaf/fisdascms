import { Body, Controller, Get, Put } from '@nestjs/common';
import { SuccessfulResponse } from 'src/lib/dtos/response.dto';
import { OrganigramService } from 'src/use-cases/organigram/organigram.service';

@Controller('api/organigram')
export class OrganigramController {
  constructor(private organigramService: OrganigramService) {}

  @Get()
  async getAll() {
    const organigram = await this.organigramService.getOne();
    return new SuccessfulResponse('Sukses', { organigram });
  }

  @Put()
  async update(@Body() updateData: object) {
    const updatedOrganigram = await this.organigramService.update(updateData);
    return new SuccessfulResponse('Organigram berhasil diupdate', {
      updatedOrganigram,
    });
  }
}
