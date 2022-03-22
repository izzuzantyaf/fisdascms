import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ErrorResponse, SuccessfulResponse } from 'src/core/dtos/response.dto';
import { AdminService } from 'src/services/use-cases/admin/admin.service';

@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() createAdminDto: object) {
    console.log('Data masuk : ', createAdminDto);
    const storedAdmin = await this.adminService.create(createAdminDto);
    throw new SuccessfulResponse('Registrasi berhasil', HttpStatus.CREATED, {
      storedAdmin,
    });
  }

  @Get()
  async getAll() {
    const admins = await this.adminService.getAll();
    throw new SuccessfulResponse('Sukses', HttpStatus.OK, { admins });
  }

  @Delete(':id')
  async delete(@Param('id') id: any) {
    console.log('Admin id : ', id);
    await this.adminService.delete(id);
    const successfulResponse = new SuccessfulResponse('Akun berhasil dihapus');
    console.log('Response : ', successfulResponse.getResponse());
    throw successfulResponse;
  }
}
