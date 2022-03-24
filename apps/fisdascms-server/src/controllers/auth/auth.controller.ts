import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { AuthService } from 'src/services/use-cases/auth/auth.service';
import { JwtAuthGuard } from 'src/services/use-cases/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/services/use-cases/auth/local-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req) {
    const authenticatedAdmin = await this.authService.signin(req.user);
    throw new SuccessfulResponse('Login berhasil', HttpStatus.OK, {
      authenticatedAdmin,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile() {
    return {
      profile: 'asfsaflaksfjskl',
    };
  }
}
