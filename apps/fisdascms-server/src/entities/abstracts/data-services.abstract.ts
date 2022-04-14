import { IAdminGenericRepository } from './admin-repo.interface';
import { IHandoutGenericRepository } from './handout-repo.interface';

export abstract class IDataServices {
  abstract admins: IAdminGenericRepository;
  abstract handouts: IHandoutGenericRepository;
}
