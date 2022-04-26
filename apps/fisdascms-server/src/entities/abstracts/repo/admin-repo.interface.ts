import { Admin } from '../../models/admin.entity';
import { IGenericRepository } from './generic-repo.interface';

export interface IAdminRepository extends IGenericRepository<Admin> {
  seed(admin: Admin): void;
  getByEmail(email: string): Promise<Admin>;
  deleteByEmail(email: string): Promise<Admin>;
}
