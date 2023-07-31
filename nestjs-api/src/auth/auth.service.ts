import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { Auth, google } from 'googleapis';

@Injectable()
export class AuthService {
  private oauthClient: Auth.OAuth2Client;

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    this.oauthClient = new google.auth.OAuth2(clientId, clientSecret);
  }

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

  async loginGoogleUser(token: string) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);
    console.log(tokenInfo);
    const email = await this.userService.findByEmail(tokenInfo.email);
    if (email) {
      const payload = {
        email: email,
        name: 'User',
      };
      const jwtToken = this.jwtService.sign(payload);
      return {
        access_token: jwtToken,
      };
    }
    return undefined;
  }
}
