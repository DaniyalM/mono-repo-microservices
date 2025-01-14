import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from '@app/common';
import { UserDocument } from './users/models/users.schema';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from "express"
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(
  //   @CurrentUser() user: UserDocument,
  //   @Res({ passthrough: true }) response: Response
  // ) {
  //   await this.authService.login(user, response);
  //   response.send(user)
  // }


  @UseGuards(JwtAuthGuard)
  @MessagePattern("authenticate")
  async authentication(@Payload() data: any) {
    return data.user;
  }

}
