import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { isEmpty, isNotEmpty } from 'class-validator';
import { CreateAdminDto } from 'src/domains/admin/dto/admin.dto';
import { ErrorResponse } from 'src/core/dtos/response.dto';
import { DataServiceService } from 'src/database/data-service.service';
import { AdminFactoryService } from './admin-factory.service';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    private dataService: DataServiceService,
    private adminFactoryService: AdminFactoryService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    this.logger.debug(
      `createAdminDto ${JSON.stringify(createAdminDto, undefined, 2)}`,
    );
    const newAdmin = this.adminFactoryService.create(createAdminDto);
    const errors = newAdmin.validateProps();
    if (isNotEmpty(errors)) {
      this.logger.log(`User data not valid ${JSON.stringify(errors)}`);
      throw new BadRequestException(
        new ErrorResponse('Data tidak valid', { errors }),
      );
    }
    const admin = await this.dataService.admins.getByEmail(newAdmin.email);
    this.logger.debug(`Existing admin ${JSON.stringify(admin, undefined, 2)}`);
    if (isNotEmpty(admin)) {
      this.logger.log(
        `Email is already registered to user ${JSON.stringify({
          adminId: admin._id,
        })}`,
      );
      throw new ConflictException(new ErrorResponse('Email sudah terdaftar'));
    }
    await newAdmin.hashPassword();
    const storedAdmin = await this.dataService.admins.create(newAdmin);
    this.logger.debug(
      `Stored admin ${JSON.stringify(storedAdmin, undefined, 2)}`,
    );
    this.logger.log(
      `New admin created ${JSON.stringify({ adminId: storedAdmin._id })}`,
    );
    return this.adminFactoryService.create(storedAdmin);
  }

  async getAll() {
    const admins = this.adminFactoryService.createMany(
      await this.dataService.admins.getAll(),
    );
    return admins;
  }

  async delete(id: string) {
    const deletedAdmin = await this.dataService.admins.deleteById(id);
    this.logger.debug(
      `Deleted admin ${JSON.stringify(deletedAdmin, undefined, 2)}`,
    );
    if (isEmpty(deletedAdmin)) {
      this.logger.log(`Remove admin failed ${JSON.stringify({ adminId: id })}`);
      throw new BadRequestException(new ErrorResponse('Akun gagal dihapus'));
    }
    this.logger.log(
      `Remove admin success ${JSON.stringify({ adminId: deletedAdmin._id })}`,
    );
    return this.adminFactoryService.create(deletedAdmin);
  }

  async validateAdmin(email: string, password: string) {
    this.logger.debug(
      `Incoming credentials ${JSON.stringify(
        { email, password },
        undefined,
        2,
      )}`,
    );
    const adminFromDb = await this.dataService.admins.getByEmail(email);
    this.logger.debug(
      `Admin from database ${JSON.stringify(adminFromDb, undefined, 2)}`,
    );
    if (isEmpty(adminFromDb))
      throw new BadRequestException(new ErrorResponse('Login gagal'));
    const admin = this.adminFactoryService.create(adminFromDb);
    const isPasswordMatch = await admin.verifyPassword(password);
    this.logger.debug(
      `Is password match ${JSON.stringify({ isPasswordMatch })}`,
    );
    if (!isPasswordMatch)
      throw new BadRequestException(new ErrorResponse('Login gagal'));
    return admin;
  }
}
