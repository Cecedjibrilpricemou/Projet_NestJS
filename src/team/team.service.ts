import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeamService {
  // injection de PrismaService pour pouvoir interroger la base de données
  constructor(private readonly prisma: PrismaService) {}

  // retourne toutes les équipes présentes en base
  async getAllTeams() {
    return this.prisma.team.findMany();
  }

  // retourne une seule équipe à partir de son id
  async getOneTeam(id: number) {
    const team = await this.prisma.team.findUnique({
      where: { id },
    });

    // si aucune équipe trouvée avec cet id, on renvoie une erreur 404
    if (!team) {
      throw new NotFoundException(`Team avec l'id ${id} introuvable`);
    }

    return team;
  }

  // crée une nouvelle équipe à partir de son nom
  async createTeam(nom: string, countryId: number) {
    return this.prisma.team.create({
      data: { nom, countryId },
    });
  }

  // remplace le nom d'une équipe existante (mise à jour complète, type PUT)
  async updateTeam(id: number, nom: string, countryId: number) {
    await this.getOneTeam(id);

    return this.prisma.team.update({
      where: { id },
      data: { nom, countryId },
    });
  }

  // met à jour partiellement une équipe (type PATCH, uniquement les champs fournis)
  async patchTeam(id: number, data: Partial<{ nom: string; countryId: number }>) {
    await this.getOneTeam(id);

    return this.prisma.team.update({
      where: { id },
      data,
    });
  }

  // supprime une équipe à partir de son id
  async deleteTeam(id: number) {
    await this.getOneTeam(id);

    return this.prisma.team.delete({
      where: { id },
    });
  }
}
