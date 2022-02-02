import { IsJWT } from 'class-validator';

export class RefreshToken {
  @IsJWT()
  refreshToken;
}
