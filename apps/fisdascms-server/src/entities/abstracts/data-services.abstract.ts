import { IAdminGenericRepository } from './admin-repo.interface';

export abstract class IDataServices {
  abstract admins: IAdminGenericRepository;
}
