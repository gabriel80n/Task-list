import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/authRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('google'))
  @Get('auth/google/login')
  @IsPublic()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleLogin(@Req() req) {}

  @UseGuards(AuthGuard('google'))
  @Get('auth/google/callback')
  @IsPublic()
  googleAuthRedirect(@Req() req, @Res() res) {
    return this.authService.googleAuthRedirect(req, res);
  }
  @Get('route/verify')
  routeVerify() {
    return true;
  }
}
