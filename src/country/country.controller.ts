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
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
  // injection du service pour déléguer la logique métier
  constructor(private readonly countryService: CountryService) {}

  // GET /country -> retourne tous les pays
  @Get()
  getAllCountries() {
    return this.countryService.getAllCountries();
  }

  // GET /country/:id -> retourne un seul pays
  @Get(':id')
  getOneCountry(@Param('id', ParseIntPipe) id: number) {
    return this.countryService.getOneCountry(id);
  }

  // POST /country -> crée un nouveau pays
  @Post()
  createCountry(@Body('nom') nom: string) {
    return this.countryService.createCountry(nom);
  }

  // PUT /country/:id -> remplace complètement un pays
  @Put(':id')
  updateCountry(@Param('id', ParseIntPipe) id: number, @Body('nom') nom: string) {
    return this.countryService.updateCountry(id, nom);
  }

  // PATCH /country/:id -> met à jour partiellement un pays
  @Patch(':id')
  patchCountry(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<{ nom: string }>,
  ) {
    return this.countryService.patchCountry(id, data);
  }

  // DELETE /country/:id -> supprime un pays
  @Delete(':id')
  deleteCountry(@Param('id', ParseIntPipe) id: number) {
    return this.countryService.deleteCountry(id);
  }
}
