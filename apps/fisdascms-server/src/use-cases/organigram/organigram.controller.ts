import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateOrganigramDto } from 'src/core/dtos/organigram.dto';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { OrganigramService } from 'src/use-cases/organigram/organigram.service';

@ApiTags('organigram')
@Controller('api/organigram')
export class OrganigramController {
  constructor(private organigramService: OrganigramService) {}

  @Get()
  async getAll() {
    const organigram = await this.organigramService.getOne();
    return new SuccessfulResponse('Sukses', organigram);
  }

  @Put()
  async update(@Body() updateOrganigramDto: UpdateOrganigramDto) {
    const updatedOrganigram = await this.organigramService.update(
      updateOrganigramDto,
    );
    return new SuccessfulResponse(
      'Organigram berhasil diupdate',
      updatedOrganigram,
    );
  }
}
