import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
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
    console.log('Incoming data :', createAdminDto);
    const newAdmin = this.adminFactoryService.create(createAdminDto);
    const errors = newAdmin.validateProps();
    if (errors)
      throw new BadRequestException(
        new ErrorResponse('Data tidak valid', { errors }),
      );
    const admin = await this.dataServices.admins.getByEmail(newAdmin.email);
    console.log('Existing admin :', admin);
    if (admin)
      throw new ConflictException(new ErrorResponse('Email sudah terdaftar'));
    await newAdmin.hashPassword();
    const storedAdmin = await this.dataServices.admins.create(newAdmin);
    console.log('Stored admin :', storedAdmin);
    return this.adminFactoryService.create(storedAdmin);
  }

  async getAll() {
    const admins = this.adminFactoryService.createMany(
      await this.dataServices.admins.getAll(),
    );
    return admins;
  }

  async delete(id: string) {
    console.log('Admin id :', id);
    const deletedAdmin = await this.dataServices.admins.deleteById(id);
    console.log('Deleted admin :', deletedAdmin);
    if (!deletedAdmin)
      throw new BadRequestException(new ErrorResponse('Akun gagal dihapus'));
    return this.adminFactoryService.create(deletedAdmin);
  }

  async validateAdmin(email: string, password: string) {
    console.log('Incoming credentials :', { email, password });
    const adminFromDb = await this.dataServices.admins.getByEmail(email);
    console.log('Admin from database :', adminFromDb);
    if (!adminFromDb)
      throw new BadRequestException(new ErrorResponse('Login gagal'));
    const admin = this.adminFactoryService.create(adminFromDb);
    const isPasswordMatch = await admin.verifyPassword(password);
    console.log('Is password match :', isPasswordMatch);
    if (!isPasswordMatch)
      throw new BadRequestException(new ErrorResponse('Login gagal'));
    return admin;
  }
}
