import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersController } from 'src/users/users.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
