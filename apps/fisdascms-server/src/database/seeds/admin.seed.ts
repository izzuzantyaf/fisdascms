import { AdminRole } from 'src/core/constants';

export const adminSeeder =
  process.env.NODE_ENV === 'production'
    ? {
        name: 'MSI Fisdas',
        email: 'msi.fisdas@gmail.com',
        password: 'msiayeee007',
        role: AdminRole.OWNER,
      }
    : {
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin123',
        role: AdminRole.OWNER,
      };
