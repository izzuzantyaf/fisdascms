import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { AdminService } from 'src/services/use-cases/admin/admin.service';
import { JwtAuthGuard } from 'src/services/use-cases/auth/jwt-auth.guard';

@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() createAdminDto: object) {
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
