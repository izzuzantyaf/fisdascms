import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AdminRole } from 'src/core/constants';
import { CreateAdminDto } from 'src/domains/admin/dto/create-admin.dto';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { Admin } from 'src/domains/admin/entities/admin.entity';
import { AdminService } from 'src/domains/admin/admin.service';

const fakeAdmin = {
  name: 'John Doe',
  email: 'johndoe@email.com',
  password: 'helloworld',
  role: AdminRole.OWNER,
};
@ApiTags('admin')
@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiBody({
    type: CreateAdminDto,
    description: 'Menambahkan admin baru',
    examples: {
      owner: {
        summary: 'Admin dengan role owner',
        value: fakeAdmin,
      },
      admin: {
        summary: 'Admin dengan role admin',
        value: {
          ...fakeAdmin,
          role: AdminRole.ADMIN,
        },
      },
    },
  })
  @ApiCreatedResponse({ type: Admin })
  async create(@Body() createAdminDto: CreateAdminDto) {
    const storedAdmin = await this.adminService.create(createAdminDto);
    return new SuccessfulResponse('Registrasi berhasil', storedAdmin);
  }

  @Get()
  async getAll() {
    const admins = await this.adminService.getAll();
    return new SuccessfulResponse('Sukses', admins);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.adminService.delete(id);
    return new SuccessfulResponse('Akun berhasil dihapus');
  }
}
