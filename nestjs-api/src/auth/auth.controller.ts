import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  Ip,
  Req,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/authRequest';
import { IsPublic } from './decorators/is-public.decorator';
import GoogleTokenDto from './models/google-login-body';

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
  @IsPublic()
  @Get()
  loginGoogleUser(@Body() token: string) {
    return this.authService.loginGoogleUser(token);
  }
  @Post('google/login')
  async googleLogin(@Body() body: GoogleTokenDto) {
    const result = await this.authService.loginGoogleUser(body.token);
    if (result) {
      return result;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Error while logging with google',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
  @Get('route/verify')
  routeVerify() {
    return true;
  }
}
