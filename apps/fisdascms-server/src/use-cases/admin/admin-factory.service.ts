import { Admin } from 'src/core/entities/admin.entity';
import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from 'src/core/dtos/admin/admin-create.dto';

@Injectable()
export class AdminFactoryService {
  create(props: Pick<Admin, '_id'> & CreateAdminDto) {
    return new Admin(props);
  }

  createMany(arrayOfProps: (Pick<Admin, '_id'> & CreateAdminDto)[]) {
    const admins = arrayOfProps.map((props) => new Admin(props));
    return admins;
  }
}
