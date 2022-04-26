import { Body, Controller, Get, Put } from '@nestjs/common';
import { SuccessfulResponse } from 'src/entities/dtos/response.dto';
import { CodeOfConductService } from 'src/use-cases/code-of-conduct/code-of-conduct.service';

@Controller('api/code-of-conduct')
export class CodeOfConductController {
  constructor(private codeOfConductService: CodeOfConductService) {}

  @Get()
  async getAll() {
    const codeOfConduct = await this.codeOfConductService.getOne();
    return new SuccessfulResponse('Sukses', { codeOfConduct });
  }

  @Put()
  async update(@Body() updateData: object) {
    const updatedCodeOfConduct = await this.codeOfConductService.update(
      updateData,
    );
    return new SuccessfulResponse('Tata tertib berhasil diupdate', {
      updatedCodeOfConduct,
    });
  }
}
