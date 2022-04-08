import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SuccessfulResponse } from 'src/entities/dtos/response.dto';
import { AdminService } from 'src/use-cases/admin/admin.service';

@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() createAdminDto: object) {
    const storedAdmin = await this.adminService.create(createAdminDto);
    return new SuccessfulResponse('Registrasi berhasil', {
      storedAdmin,
    });
  }

  @Get()
  async getAll() {
    const admins = await this.adminService.getAll();
    return new SuccessfulResponse('Sukses', { admins });
  }

  @Delete(':id')
  async delete(@Param('id') id: any) {
    await this.adminService.delete(id);
    return new SuccessfulResponse('Akun berhasil dihapus');
  }
}
