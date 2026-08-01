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

  // remplace le nom d'une position existante (mise à jour complète, type PUT)
  async updatePosition(id: number, nom: string) {
    // vérifie que la position existe, sinon lève une 404
    await this.getOnePosition(id);

    return this.prisma.position.update({
      where: { id },
      data: { nom },
    });
  }

  // met à jour partiellement une position (type PATCH, uniquement les champs fournis)
  async patchPosition(id: number, data: Partial<{ nom: string }>) {
    await this.getOnePosition(id);

    return this.prisma.position.update({
      where: { id },
      data,
    });
  }

  // supprime une position à partir de son id
  async deletePosition(id: number) {
    // vérifie que la position existe, sinon lève une 404
    await this.getOnePosition(id);

    return this.prisma.position.delete({
      where: { id },
    });
  }
}
