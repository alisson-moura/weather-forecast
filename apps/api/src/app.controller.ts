import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CitiesResponseDto } from './dto/cities-response-dto';
import { ForecastQueryDto } from './dto/forecast-query.dto';
import { ForecastResponseDto } from './dto/forecast-response.dto';
import { GeocodingClient } from './weather-map-api/geocoding-client';
import { WeatherForecastClient } from './weather-map-api/weather-forecast-client';

@ApiTags('Forecast')
@Controller({
	version: '1',
})
export class AppController {
	constructor(
		private readonly geocodingClient: GeocodingClient,
		private readonly weatherForecastClient: WeatherForecastClient,
	) {}

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

	@Get('forecasts')
	@ApiQuery({
		name: 'lat',
		type: Number,
		required: true,
		description: 'Latitude da cidade',
	})
	@ApiQuery({
		name: 'lon',
		type: Number,
		required: true,
		description: 'Longitude da cidade',
	})
	@ApiResponse({
		status: 200,
		description: 'Previsão do tempo para a localização especificada',
		type: ForecastResponseDto,
	})
	async getForecast(@Query() query: ForecastQueryDto): Promise<ForecastResponseDto> {
		const apiResponse = await this.weatherForecastClient.getFiveDays(
			parseFloat(query.lat),
			parseFloat(query.lon),
		);
		const city = {
			name: apiResponse.city.name,
			lat: apiResponse.city.coord.lat,
			lon: apiResponse.city.coord.lon,
		};
		const list = apiResponse.list.map((item) => ({
			dt_txt: item.dt_txt,
			temp: item.main.temp,
			feels_like: item.main.feels_like,
			humidity: item.main.humidity,
			wind_speed: item.wind.speed,
			weather: item.weather.map((w) => ({
				description: w.description,
				icon: w.icon,
			})),
		}));
		return {
			city,
			list,
		};
	}
}
