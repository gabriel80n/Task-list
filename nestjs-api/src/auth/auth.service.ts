import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { CreateUserDto } from 'src/users/dtos/create-user-body';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): UserToken {
    // transforma o user em um JWT
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      //hash corresponde a hash no banco?
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new Error('Email adress or password provided is incorrect.');
  }

  //googleLogin(req) {}
  async googleAuthRedirect(req, res) {
    if (!req.user) {
      return { message: 'No user from google' };
    }

    const user: CreateUserDto = {
      name: req.user.firstName,
      email: req.user.email,
      password: null,
    };

    let userToken = null;

    try {
      // Verifica se o usuário já existe no banco de dados
      const userBank = await this.userService.findByEmail(req.user.email);

      if (!userBank) {
        // Se o usuário não existe, cria o usuário
        userToken = await this.userService.create(user);
      } else {
        // Se o usuário já existe, usa o token do usuário existente
        userToken = userBank;
      }

      // Gerar o token JWT com os dados do usuário criado ou existente
      const payload: UserPayload = {
        sub: userToken.id,
        email: userToken.email,
        name: userToken.name,
      };
      const jwtToken = this.jwtService.sign(payload);

      const redirectUrl = `http://localhost:3000/callbackPage?token=${jwtToken}`;
      return res.redirect(redirectUrl);
    } catch (error) {
      console.error('Erro no callback do Google:', error);
      return { message: 'Internal server error' };
    }
  }
}
