import { Admin } from 'src/database/entity/admin.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminFactoryService {
  create(createAdminDto: object) {
    return new Admin(createAdminDto);
  }

  createMany(createAdminDtos: object[]) {
    const admins = createAdminDtos.map(
      (createAdminDto) => new Admin(createAdminDto),
    );
    return admins;
  }
}
