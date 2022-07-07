import { BadRequestException, Injectable } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';
import { DataServiceService } from 'src/database/data-service.service';
import { ErrorResponse } from 'src/lib/dtos/response.dto';
import { CodeOfConductFactoryService } from './code-of-conduct-factory.service';

@Injectable()
export class CodeOfConductService {
  constructor(
    private dataService: DataServiceService,
    private codeOfConductFactory: CodeOfConductFactoryService,
  ) {}

  async getOne() {
    const codeOfConduct = this.codeOfConductFactory.create(
      await this.dataService.codeOfConducts.getFirst(),
    );
    return codeOfConduct;
  }

  async update(updateData: object) {
    console.log('Incoming data :', updateData);
    const newCodeOfConduct = this.codeOfConductFactory.create(updateData);
    const errors = newCodeOfConduct.validateProps();
    if (isNotEmpty(errors))
      throw new BadRequestException(
        new ErrorResponse('Tata tertib gagal diupdate', { errors }),
      );
    const updatedCodeOfConduct = this.codeOfConductFactory.create(
      await this.dataService.codeOfConducts.updateById(
        newCodeOfConduct._id,
        newCodeOfConduct,
      ),
    );
    console.log('Updated code of conduct :', updatedCodeOfConduct);
    return updatedCodeOfConduct;
  }
}
