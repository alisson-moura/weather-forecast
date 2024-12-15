import { Controller, Get, NotFoundException, Query } from '@nestjs/common';

import { GeocodingClient } from './weather-map-api/geocoding-client';

@Controller({
	version: '1',
})
export class AppController {
	constructor(private readonly geocodingClient: GeocodingClient) {}

	@Get('cities')
	async getCities(@Query('name') name: string) {
		const cities = await this.geocodingClient.findByName(name);
		if (cities.length > 0) return cities;
		throw new NotFoundException('Cidade não encontrada');
	}
}
