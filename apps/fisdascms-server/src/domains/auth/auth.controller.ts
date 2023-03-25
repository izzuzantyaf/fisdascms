import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { AuthService } from 'src/domains/auth/auth.service';
import { JwtAuthGuard } from 'src/domains/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/domains/auth/guards/local-auth-guard';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Request() req) {
    this.logger.debug(`Request.body ${JSON.stringify(req.body, undefined, 2)}`);
    this.logger.debug(`Request.user ${JSON.stringify(req.user, undefined, 2)}`);
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
