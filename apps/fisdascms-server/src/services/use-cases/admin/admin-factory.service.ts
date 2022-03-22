import { Admin } from 'src/core/entities/admin.entity';
import { CreateAdminDto } from 'src/core/dtos/create-admin.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminFactoryService {
  create(createAdminDto: object) {
    const newAdmin = new Admin(createAdminDto);
    return newAdmin;
  }
}
