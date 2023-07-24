import { Injectable } from '@nestjs/common';
import { UsersController } from 'src/users/users.controller';

@Injectable()
export class AuthService {
  constructor(private readonly userController: UsersController);
  validateUser(email: string, password: string) {
    const user = this.userController;
  }
}
