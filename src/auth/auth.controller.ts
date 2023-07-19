import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(':provider')
  async handleSocialLogin(@Body() socialUser: any, @Req() req) {
    if (req.params.provider === 'GOOGLE') {
      return this.authService.handleGoogleLogin(socialUser);
    } else {
      throw new Error('Invalid social login provider.');
    }
  }
}
