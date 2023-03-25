import {
  Admin,
  AdminConstructorProps,
} from 'src/domains/admin/entities/admin.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminFactoryService {
  create(props: AdminConstructorProps) {
    return new Admin(props);
  }

  createMany(arrayOfProps: AdminConstructorProps[]) {
    const admins = arrayOfProps.map((props) => new Admin(props));
    return admins;
  }
}
