//2eme etape ->  on part sur la documentation de nest js et on recupere ce code de prisma service
// ce qui nous permettre d'initialiser le service de prisma

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string);
    super({ adapter });
  }
}
