import { Admin } from '../entities/admin.entity';

export type CreateAdminDto = Pick<
  Admin,
  'name' | 'email' | 'password' | 'role'
>;
