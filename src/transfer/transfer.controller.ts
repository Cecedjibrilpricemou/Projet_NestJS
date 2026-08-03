import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TransferService } from './transfer.service';

@Controller('transfer')
export class TransferController {
  // injection du service pour déléguer la logique métier
  constructor(private readonly transferService: TransferService) {}

  // GET /transfer -> retourne tout l'historique des transferts
  @Get()
  getAllTransfers() {
    return this.transferService.getAllTransfers();
  }

  // GET /transfer/:id -> retourne un seul transfert
  @Get(':id')
  getOneTransfer(@Param('id', ParseIntPipe) id: number) {
    return this.transferService.getOneTransfer(id);
  }

  // POST /transfer -> achète un joueur pour le faire passer vers toTeamId
  @Post()
  createTransfer(
    @Body('playerId', ParseIntPipe) playerId: number,
    @Body('toTeamId', ParseIntPipe) toTeamId: number,
    @Body('montant') montant: number,
  ) {
    return this.transferService.createTransfer(playerId, toTeamId, montant);
  }
}
