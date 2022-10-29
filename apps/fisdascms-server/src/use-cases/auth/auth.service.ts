import { Injectable, Logger } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { isNotEmpty } from 'class-validator';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(email: string, password: string) {
    let admin;
    try {
      admin = await this.adminService.validateAdmin(email, password);
    } catch (error) {
      this.logger.log(`Login failed ${JSON.stringify({ email })}`);
    }
    return admin;
  }

  async signin(admin: any) {
    delete admin.password;
    const payload = { ...admin };
    this.logger.debug(`Payload ${JSON.stringify(payload, undefined, 2)}`);
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    this.logger.debug(
      `Access token generated ${JSON.stringify(
        { adminId: admin._id, access_token },
        undefined,
        2,
      )}`,
    );
    this.logger.log(`Login success ${JSON.stringify({ adminId: admin._id })}`);
    return {
      access_token,
    };
  }
}
