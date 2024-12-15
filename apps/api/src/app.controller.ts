import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CitiesResponseDto } from './dto/cities-response-dto';
import { GeocodingClient } from './weather-map-api/geocoding-client';

@ApiTags('Cities')
@Controller({
	version: '1',
})
export class AppController {
	constructor(private readonly geocodingClient: GeocodingClient) {}

	@Get('cities')
	@ApiQuery({
		name: 'name',
		type: String,
		required: true,
		description: 'Nome da cidade a ser buscada',
	})
	@ApiResponse({
		status: 200,
		description: 'Lista de cidades encontradas com suas coordenadas',
		type: CitiesResponseDto,
		isArray: true,
	})
	@ApiNotFoundResponse({
		description: 'Cidade não encontrada',
	})
	async getCities(@Query('name') name: string): Promise<CitiesResponseDto[]> {
		const cities = await this.geocodingClient.findByName(name);
		if (cities.length > 0) return cities;
		throw new NotFoundException('Cidade não encontrada');
	}
}
