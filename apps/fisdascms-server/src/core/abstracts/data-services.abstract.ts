import { Admin } from '../entities/admin.entity';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract admins: IGenericRepository<Admin>;
}
