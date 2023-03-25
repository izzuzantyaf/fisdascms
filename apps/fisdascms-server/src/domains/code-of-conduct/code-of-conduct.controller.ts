import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCodeOfConductDto } from 'src/domains/code-of-conduct/dto/code-of-conduct.dto';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { CodeOfConductService } from 'src/domains/code-of-conduct/code-of-conduct.service';

@ApiTags('code of conduct')
@Controller('api/code-of-conduct')
export class CodeOfConductController {
  constructor(private codeOfConductService: CodeOfConductService) {}

  @Get()
  async getAll() {
    const codeOfConduct = await this.codeOfConductService.getOne();
    return new SuccessfulResponse('Sukses', codeOfConduct);
  }

  @Put()
  async update(@Body() updateCodeOfConductDto: UpdateCodeOfConductDto) {
    const updatedCodeOfConduct = await this.codeOfConductService.update(
      updateCodeOfConductDto,
    );
    return new SuccessfulResponse(
      'Tata tertib berhasil diupdate',
      updatedCodeOfConduct,
    );
  }
}
