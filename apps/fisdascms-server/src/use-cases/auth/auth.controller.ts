import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SuccessfulResponse } from 'src/lib/dtos/response.dto';
import { AuthService } from 'src/use-cases/auth/auth.service';
import { JwtAuthGuard } from 'src/use-cases/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/use-cases/auth/guards/local-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Request() req) {
    const { access_token } = await this.authService.signin(req.user);
    return new SuccessfulResponse('Login berhasil', { access_token });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile() {
    return {
      profile: 'asfsaflaksfjskl',
    };
  }
}
