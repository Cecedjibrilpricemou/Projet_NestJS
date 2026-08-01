import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PositionService {
  // injection de PrismaService pour pouvoir interroger la base de données
  constructor(private readonly prisma: PrismaService) {}

  // retourne toutes les positions présentes en base
  async getAllPositions() {
    return this.prisma.position.findMany();
  }

  // retourne une seule position à partir de son id
  async getOnePosition(id: number) {
    const position = await this.prisma.position.findUnique({
      where: { id },
    });

    // si aucune position trouvée avec cet id, on renvoie une erreur 404
    if (!position) {
      throw new NotFoundException(`Position avec l'id ${id} introuvable`);
    }

    return position;
  }

  // crée une nouvelle position à partir de son nom
  async createPosition(nom: string) {
    return this.prisma.position.create({
      data: { nom },
    });
  }
}
