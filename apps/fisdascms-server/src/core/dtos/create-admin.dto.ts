import { ApiHideProperty, ApiProperty, ApiQuery } from '@nestjs/swagger';
import { AdminRole } from '../constants';
import { Admin } from '../entities/admin.entity';

export class CreateAdminDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  role: AdminRole;
}
