import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  // injection du service pour déléguer la logique métier
  constructor(private readonly playerService: PlayerService) {}

  // GET /player -> retourne tous les joueurs
  @Get()
  getAllPlayers() {
    return this.playerService.getAllPlayers();
  }

  // GET /player/:id -> retourne un seul joueur
  @Get(':id')
  getOnePlayer(@Param('id', ParseIntPipe) id: number) {
    return this.playerService.getOnePlayer(id);
  }

  // POST /player -> crée un nouveau joueur
  @Post()
  createPlayer(
    @Body()
    data: {
      nom: string;
      prenom: string;
      age: number;
      positionId: number;
      teamId: number;
    },
  ) {
    return this.playerService.createPlayer(data);
  }

  // PUT /player/:id -> remplace complètement un joueur
  @Put(':id')
  updatePlayer(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    data: {
      nom: string;
      prenom: string;
      age: number;
      positionId: number;
      teamId: number;
    },
  ) {
    return this.playerService.updatePlayer(id, data);
  }

  // PATCH /player/:id -> met à jour partiellement un joueur
  @Patch(':id')
  patchPlayer(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    data: Partial<{
      nom: string;
      prenom: string;
      age: number;
      positionId: number;
      teamId: number;
    }>,
  ) {
    return this.playerService.patchPlayer(id, data);
  }

  // DELETE /player/:id -> supprime un joueur
  @Delete(':id')
  deletePlayer(@Param('id', ParseIntPipe) id: number) {
    return this.playerService.deletePlayer(id);
  }
}
