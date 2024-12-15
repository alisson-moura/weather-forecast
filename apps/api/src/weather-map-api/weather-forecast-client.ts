import { HttpService } from '@nestjs/axios';
import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FiveDaysThreeHourForecastDto } from './dto/five-days-three-hour-forecast-response.dto';

import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';

export class WeatherForecastClient {
	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService,
	) {}
	async getFiveDays(lat: number, lon: number): Promise<FiveDaysThreeHourForecastDto> {
		try {
			const { data } = await firstValueFrom(
				this.httpService.get<FiveDaysThreeHourForecastDto>(
					this.configService.getOrThrow<string>('API_WEATHER_FORECAST_BASE_URL'),
					{
						params: {
							lat,
							lon,
							lang: this.configService.getOrThrow<string>('OPENWEATHER_LANG_CODE'),
							units: this.configService.getOrThrow<string>('OPENWEATHER_UNIT'),
							appid: this.configService.getOrThrow<string>('OPENWEATHER_API_KEY'),
						},
					},
				),
			);
			return data;
		} catch (error) {
			console.log(error);
			const axiosError = error as AxiosError;
			const errorMessage =
				axiosError.response?.data || 'Erro ao acessar a API de previsão do tempo.';
			throw new InternalServerErrorException(errorMessage);
		}
	}
}
