import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { isEmpty, isNotEmpty } from 'class-validator';
import { ErrorResponse } from 'src/core/dtos/response.dto';
import { DataServiceService } from 'src/database/data-service.service';
import { AdminFactoryService } from './admin-factory.service';

@Injectable()
export class AdminService {
  constructor(
    private dataService: DataServiceService,
    private adminFactoryService: AdminFactoryService,
  ) {}

  async create(createAdminDto: object) {
    console.log('Incoming data :', createAdminDto);
    const newAdmin = this.adminFactoryService.create(createAdminDto);
    const errors = newAdmin.validateProps();
    if (isNotEmpty(errors))
      throw new BadRequestException(
        new ErrorResponse('Data tidak valid', { errors }),
      );
    const admin = await this.dataService.admins.getByEmail(newAdmin.email);
    console.log('Existing admin :', admin);
    if (isNotEmpty(admin))
      throw new ConflictException(new ErrorResponse('Email sudah terdaftar'));
    await newAdmin.hashPassword();
    const storedAdmin = await this.dataService.admins.create(newAdmin);
    console.log('Stored admin :', storedAdmin);
    return this.adminFactoryService.create(storedAdmin);
  }

  async getAll() {
    const admins = this.adminFactoryService.createMany(
      await this.dataService.admins.getAll(),
    );
    return admins;
  }

  async delete(id: string) {
    console.log('Admin id :', id);
    const deletedAdmin = await this.dataService.admins.deleteById(id);
    console.log('Deleted admin :', deletedAdmin);
    if (isEmpty(deletedAdmin))
      throw new BadRequestException(new ErrorResponse('Akun gagal dihapus'));
    return this.adminFactoryService.create(deletedAdmin);
  }

  async validateAdmin(email: string, password: string) {
    console.log('Incoming credentials :', { email, password });
    const adminFromDb = await this.dataService.admins.getByEmail(email);
    console.log('Admin from database :', adminFromDb);
    if (isEmpty(adminFromDb))
      throw new BadRequestException(new ErrorResponse('Login gagal'));
    const admin = this.adminFactoryService.create(adminFromDb);
    const isPasswordMatch = await admin.verifyPassword(password);
    console.log('Is password match :', isPasswordMatch);
    if (!isPasswordMatch)
      throw new BadRequestException(new ErrorResponse('Login gagal'));
    return admin;
  }
}
