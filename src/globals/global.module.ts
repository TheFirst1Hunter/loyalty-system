import { Global, Module } from '@nestjs/common';
import { globalProviders } from './global.types';
import { prisma } from '../../prisma';

@Global()
@Module({
  providers: [{ provide: globalProviders.prisma, useValue: prisma }],
  exports: [globalProviders.prisma],
})
export class PrismaModule {}
