import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GeocodingWeatherMapAPIResponseDto } from './dto/geocoding-weathermap-response.dto';

import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GeocodingClient {
	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService,
	) {}

	public async findByName(
		name: string,
	): Promise<Array<{ name: string; state: string; lat: number; lon: number }>> {
		try {
			const { data } = await firstValueFrom(
				this.httpService.get<GeocodingWeatherMapAPIResponseDto[]>(
					this.configService.getOrThrow<string>('API_GEO_BASE_URL'),
					{
						params: {
							q: `${name},${this.configService.getOrThrow<string>('OPENWEATHER_COUNTRY_CODE')}`,
							appid: this.configService.getOrThrow<string>('OPENWEATHER_API_KEY'),
						},
					},
				),
			);
			return data.map((city) => ({
				name: city.name,
				state: city.state!,
				lat: city.lat,
				lon: city.lon,
			}));
		} catch (error) {
			const axiosError = error as AxiosError;
			const errorMessage = axiosError.response?.data || 'Erro ao acessar a API de geocoding.';
			throw new InternalServerErrorException(errorMessage);
		}
	}
}
