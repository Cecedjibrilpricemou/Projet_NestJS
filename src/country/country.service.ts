import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CountryService {
  // injection de PrismaService pour pouvoir interroger la base de données
  constructor(private readonly prisma: PrismaService) {}

  // retourne tous les pays présents en base
  async getAllCountries() {
    return this.prisma.country.findMany();
  }

  // retourne un seul pays à partir de son id
  async getOneCountry(id: number) {
    const country = await this.prisma.country.findUnique({
      where: { id },
    });

    // si aucun pays trouvé avec cet id, on renvoie une erreur 404
    if (!country) {
      throw new NotFoundException(`Country avec l'id ${id} introuvable`);
    }

    return country;
  }

  // crée un nouveau pays à partir de son nom
  async createCountry(nom: string) {
    return this.prisma.country.create({
      data: { nom },
    });
  }

  // remplace le nom d'un pays existant (mise à jour complète, type PUT)
  async updateCountry(id: number, nom: string) {
    await this.getOneCountry(id);

    return this.prisma.country.update({
      where: { id },
      data: { nom },
    });
  }

  // met à jour partiellement un pays (type PATCH, uniquement les champs fournis)
  async patchCountry(id: number, data: Partial<{ nom: string }>) {
    await this.getOneCountry(id);

    return this.prisma.country.update({
      where: { id },
      data,
    });
  }

  // supprime un pays à partir de son id
  async deleteCountry(id: number) {
    await this.getOneCountry(id);

    return this.prisma.country.delete({
      where: { id },
    });
  }
}
