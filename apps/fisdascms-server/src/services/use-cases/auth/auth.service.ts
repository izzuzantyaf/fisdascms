import { Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(email: string, password: string) {
    return await this.adminService.validateAdmin(email, password);
  }

  async signin(admin: any) {
    const payload = {
      username: admin.email,
      password: admin.password,
    };
    return { ...admin, access_token: this.jwtService.sign(payload) };
  }
}
