import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TransferService {
  // injection de PrismaService pour pouvoir interroger la base de données
  constructor(private readonly prisma: PrismaService) {}

  // retourne tous les transferts présents en base
  async getAllTransfers() {
    return this.prisma.transfer.findMany();
  }

  // retourne un seul transfert à partir de son id
  async getOneTransfer(id: number) {
    const transfer = await this.prisma.transfer.findUnique({
      where: { id },
    });

    if (!transfer) {
      throw new NotFoundException(`Transfer avec l'id ${id} introuvable`);
    }

    return transfer;
  }

  // achète un joueur : le fait passer de son équipe actuelle vers toTeamId
  // et enregistre le transfert dans l'historique
  async createTransfer(playerId: number, toTeamId: number, montant: number) {
    const player = await this.prisma.player.findUnique({
      where: { id: playerId },
    });

    if (!player) {
      throw new NotFoundException(`Player avec l'id ${playerId} introuvable`);
    }

    const toTeam = await this.prisma.team.findUnique({
      where: { id: toTeamId },
    });

    if (!toTeam) {
      throw new NotFoundException(`Team avec l'id ${toTeamId} introuvable`);
    }

    const fromTeamId = player.teamId;

    if (fromTeamId === toTeamId) {
      throw new BadRequestException(
        'Le joueur appartient déjà à cette équipe',
      );
    }

    // on met à jour l'équipe du joueur et on enregistre le transfert en une seule transaction
    const [, transfer] = await this.prisma.$transaction([
      this.prisma.player.update({
        where: { id: playerId },
        data: { teamId: toTeamId },
      }),
      this.prisma.transfer.create({
        data: { playerId, fromTeamId, toTeamId, montant },
      }),
    ]);

    return transfer;
  }
}
