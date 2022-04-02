import { IAdminGenericRepository } from './admin-repo.abstract';

export abstract class IDataServices {
  abstract admins: IAdminGenericRepository;
}
