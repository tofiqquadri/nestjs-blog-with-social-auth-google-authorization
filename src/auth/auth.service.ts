import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SocialUser } from 'angularx-social-login';
import { UserService } from 'src/user/user.service';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  private googleClientId = process.env.GOOGLE_CLIENT_ID;

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async handleGoogleLogin(socialUser: SocialUser): Promise<any> {
    const verifiedUser = await this.verifyGoogleIdToken(socialUser.idToken);

    if (!verifiedUser) {
      throw 'User Not Found';
    }

    const user = await this.userService.findOrCreateUser(verifiedUser);

    let uiBasePermissions = [];

    for (let index = 0; index < user.basePermissions.length; index++) {
      const permission = user.basePermissions[index];
      uiBasePermissions.push(permission.name);
    }

    const payload = {
      sub: socialUser.id,
      name: user.name,
      email: user.email,
      basePermissions: uiBasePermissions,
    }; // Add any additional user data to the payload

    const response = {
      success: true,
      error: false,
      data: { jwtToken: await this.generateToken(payload) },
    };

    return response;
  }

  private async verifyGoogleIdToken(idToken: string): Promise<any> {
    const client = new OAuth2Client(this.googleClientId);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: this.googleClientId,
    });
    const payload = ticket.getPayload();
    return payload;
  }

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
