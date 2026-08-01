import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

// forme des données nécessaires pour créer/remplacer un joueur
interface PlayerInput {
  nom: string;
  prenom: string;
  age: number;
  positionId: number;
  teamId: number;
}

@Injectable()
export class PlayerService {
  // injection de PrismaService pour pouvoir interroger la base de données
  constructor(private readonly prisma: PrismaService) {}

  // retourne tous les joueurs présents en base
  async getAllPlayers() {
    return this.prisma.player.findMany();
  }

  // retourne un seul joueur à partir de son id
  async getOnePlayer(id: number) {
    const player = await this.prisma.player.findUnique({
      where: { id },
    });

    // si aucun joueur trouvé avec cet id, on renvoie une erreur 404
    if (!player) {
      throw new NotFoundException(`Player avec l'id ${id} introuvable`);
    }

    return player;
  }

  // crée un nouveau joueur
  async createPlayer(data: PlayerInput) {
    return this.prisma.player.create({
      data,
    });
  }

  // remplace complètement un joueur existant (type PUT)
  async updatePlayer(id: number, data: PlayerInput) {
    await this.getOnePlayer(id);

    return this.prisma.player.update({
      where: { id },
      data,
    });
  }

  // met à jour partiellement un joueur (type PATCH, uniquement les champs fournis)
  async patchPlayer(id: number, data: Partial<PlayerInput>) {
    await this.getOnePlayer(id);

    return this.prisma.player.update({
      where: { id },
      data,
    });
  }

  // supprime un joueur à partir de son id
  async deletePlayer(id: number) {
    await this.getOnePlayer(id);

    return this.prisma.player.delete({
      where: { id },
    });
  }
}
