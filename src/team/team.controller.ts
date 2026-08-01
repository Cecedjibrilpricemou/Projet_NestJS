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
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  // injection du service pour déléguer la logique métier
  constructor(private readonly teamService: TeamService) {}

  // GET /team -> retourne toutes les équipes
  @Get()
  getAllTeams() {
    return this.teamService.getAllTeams();
  }

  // GET /team/:id -> retourne une seule équipe
  @Get(':id')
  getOneTeam(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.getOneTeam(id);
  }

  // POST /team -> crée une nouvelle équipe
  @Post()
  createTeam(@Body('nom') nom: string) {
    return this.teamService.createTeam(nom);
  }

  // PUT /team/:id -> remplace complètement une équipe
  @Put(':id')
  updateTeam(@Param('id', ParseIntPipe) id: number, @Body('nom') nom: string) {
    return this.teamService.updateTeam(id, nom);
  }

  // PATCH /team/:id -> met à jour partiellement une équipe
  @Patch(':id')
  patchTeam(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<{ nom: string }>,
  ) {
    return this.teamService.patchTeam(id, data);
  }

  // DELETE /team/:id -> supprime une équipe
  @Delete(':id')
  deleteTeam(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.deleteTeam(id);
  }
}
