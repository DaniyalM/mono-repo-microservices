import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/users.schema';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) { }



  async login(user: UserDocument, response: Response) {
    const tokenPayload = {
      userId: user._id.toHexString()
    }
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get("JWT_EXPIRATION")
    );

    const token = this.jwtService.sign(tokenPayload);
    response.cookie('Authentication', token, {
      httpOnly: true,
      expires
    })
  }

}
