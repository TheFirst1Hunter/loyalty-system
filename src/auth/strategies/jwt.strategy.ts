import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SECRET_KEY } from '../../utils/secrets';
import { globalProviders } from '../../globals/global.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(globalProviders.prisma) private prisma: PrismaClient) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return await this.prisma.user.findUnique({ where: { id: payload.id } });
  }
}
