import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';

// 1ere etape  la premiere des choses a faire est de venir ici et importer prisma service
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PositionController],
  providers: [PositionService, PrismaService],
})
export class PositionModule {}
