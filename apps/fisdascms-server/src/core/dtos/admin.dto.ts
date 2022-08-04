import { AdminConstructorProps } from '../entities/admin.entity';

export type CreateAdminDto = Omit<AdminConstructorProps, '_id'>;
