import { HttpStatus, Injectable } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts/data-services.abstract';
import { ErrorResponse } from 'src/core/dtos/response.dto';
import { AdminFactoryService } from './admin-factory.service';

@Injectable()
export class AdminService {
  constructor(
    private dataServices: IDataServices,
    private adminFactoryService: AdminFactoryService,
  ) {}

  async create(createAdminDto: object) {
    const newAdmin = this.adminFactoryService.create(createAdminDto);
    newAdmin.validateProps();
    const isAdminExists = await this.dataServices.admins.getByEmail(
      newAdmin.email,
    );
    if (isAdminExists)
      throw new ErrorResponse('Email sudah terdaftar', HttpStatus.CONFLICT);
    await newAdmin.hashPassword();
    const storedAdmin = await this.dataServices.admins.create(newAdmin);
    console.log('storedAdmin : ', storedAdmin);
    return storedAdmin;
  }

  async getAll() {
    return await this.dataServices.admins.getAll();
  }

  async delete(id: string) {
    const deletedAdmin = await this.dataServices.admins.delete(id);
    if (deletedAdmin) return deletedAdmin;
    const errorResponse = new ErrorResponse('Akun gagal dihapus');
    console.log('Response : ', errorResponse.getResponse());
    throw errorResponse;
  }
}
