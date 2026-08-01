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
import { PositionService } from './position.service';

@Controller('position')
export class PositionController {
  // injection du service pour déléguer la logique métier
  constructor(private readonly positionService: PositionService) {}

  // GET /position -> retourne toutes les positions
  @Get()
  getAllPositions() {
    return this.positionService.getAllPositions();
  }

  // GET /position/:id -> retourne une seule position
  @Get(':id')
  getOnePosition(@Param('id', ParseIntPipe) id: number) {
    return this.positionService.getOnePosition(id);
  }

  // POST /position -> crée une nouvelle position
  @Post()
  createPosition(@Body('nom') nom: string) {
    return this.positionService.createPosition(nom);
  }

  // PUT /position/:id -> remplace complètement une position
  @Put(':id')
  updatePosition(@Param('id', ParseIntPipe) id: number, @Body('nom') nom: string) {
    return this.positionService.updatePosition(id, nom);
  }

  // PATCH /position/:id -> met à jour partiellement une position
  @Patch(':id')
  patchPosition(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<{ nom: string }>,
  ) {
    return this.positionService.patchPosition(id, data);
  }

  // DELETE /position/:id -> supprime une position
  @Delete(':id')
  deletePosition(@Param('id', ParseIntPipe) id: number) {
    return this.positionService.deletePosition(id);
  }
}
