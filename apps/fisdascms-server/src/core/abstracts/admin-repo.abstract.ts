import { Admin } from '../entities/admin.entity';
import { IGenericRepository } from './generic-repo.abstract';

export interface IAdminGenericRepository extends IGenericRepository<Admin> {
  getByEmail(email: string): Promise<Admin>;
  deleteByEmail(email: string): Promise<Admin>;
}
