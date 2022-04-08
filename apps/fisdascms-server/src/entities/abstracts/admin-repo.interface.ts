import { Admin } from '../models/admin.entity';
import { IGenericRepository } from './generic-repo.interface';

export interface IAdminGenericRepository extends IGenericRepository<Admin> {
  getByEmail(email: string): Promise<Admin>;
  deleteByEmail(email: string): Promise<Admin>;
}
